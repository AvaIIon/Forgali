import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  customerFetch,
  customerLogin,
  customerLogout,
  customerRegister,
  ShopifyCustomer,
} from "@/services/shopifyService";

const TOKEN_KEY = "forgali_customer_token";

interface CustomerContextValue {
  customer: ShopifyCustomer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  register: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

const readToken = (): string | null => {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const { token, expiresAt } = JSON.parse(raw);
    if (!token || (expiresAt && new Date(expiresAt) <= new Date())) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

const storeToken = (token: string, expiresAt: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiresAt }));
  } catch {
    // private-mode storage failures: session just won't persist
  }
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = readToken();
    if (!token) {
      setLoading(false);
      return;
    }
    customerFetch(token)
      .then(c => {
        if (c) setCustomer(c);
        else localStorage.removeItem(TOKEN_KEY);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await customerLogin(email, password);
    if (!res.ok) return { ok: false, message: res.message };
    storeToken(res.token, res.expiresAt);
    const c = await customerFetch(res.token).catch(() => null);
    setCustomer(c ?? { email, firstName: null, lastName: null });
    return { ok: true };
  };

  const register = async (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const res = await customerRegister(input);
    if (!res.ok) return { ok: false, message: res.message };
    // sign the new customer straight in
    return login(input.email, input.password);
  };

  const logout = () => {
    const token = readToken();
    if (token) void customerLogout(token);
    localStorage.removeItem(TOKEN_KEY);
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{ customer, loading, login, register, logout }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
};
