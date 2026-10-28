import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { HTML_LANG, formatMoney, localeFromPathname, localizePath, type Locale } from "./locale";
import { MESSAGES, type MessageKey } from "./messages";

interface LocaleValue {
  locale: Locale;
  isFrench: boolean;
  /** Prefix an internal path for the current locale ("/about" → "/fr/about" in French). */
  lp: (path: string) => string;
  /** UI string lookup (src/i18n/messages.ts). */
  t: (key: MessageKey) => string;
  /** Currency in the locale's convention, always CAD. */
  money: (amount: number) => string;
}

const english: LocaleValue = {
  locale: "en",
  isFrench: false,
  lp: (path) => path,
  t: (key) => MESSAGES.en[key],
  money: (amount) => formatMoney(amount, "en"),
};

const LocaleContext = createContext<LocaleValue>(english);

/**
 * Reads the locale off the URL prefix (src/i18n/locale.ts) and exposes it to
 * the tree. Sits directly under <BrowserRouter> so the cart drawer and every
 * page share one value. Switching language is a full page load (see
 * components/LanguageSwitcher.tsx), so the module-level product caches in
 * hooks/useShopifyProducts.ts never hold two languages at once.
 */
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const value = useMemo<LocaleValue>(
    () =>
      locale === "en"
        ? english
        : {
            locale,
            isFrench: true,
            lp: (path) => localizePath(path, locale),
            t: (key) => MESSAGES[locale][key] ?? MESSAGES.en[key],
            money: (amount) => formatMoney(amount, locale),
          },
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

/** Current locale helpers; English outside a provider. */
export const useLocale = (): LocaleValue => useContext(LocaleContext);
