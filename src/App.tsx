import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ShopifyCartProvider } from "@/context/ShopifyCartContext";
import { AdminProvider } from "@/context/AdminContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { isShopifyConfigured } from "@/services/shopifyService";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import SmartDealsPage from "./pages/SmartDealsPage";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";
import FAQsPage from "./pages/FAQsPage";
import AboutPage from "./pages/AboutPage";
import WarrantyPage from "./pages/WarrantyPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import AssemblyPage from "./pages/AssemblyPage";
import SafetyStandardsPage from "./pages/SafetyStandardsPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";

const queryClient = new QueryClient();

const App = () => {
  const appContent = (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/smart-deals" element={<SmartDealsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/assembly" element={<AssemblyPage />} />
        <Route path="/safety-standards" element={<SafetyStandardsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <ProtectedRoute>
              <AdminSales />
            </ProtectedRoute>
          }
        />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );

  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AdminProvider>
        <CustomerProvider>
          {isShopifyConfigured() ? (
            <ShopifyCartProvider>
              <CartProvider>
                {appContent}
              </CartProvider>
            </ShopifyCartProvider>
          ) : (
            <CartProvider>
              {appContent}
            </CartProvider>
          )}
        </CustomerProvider>
        </AdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
