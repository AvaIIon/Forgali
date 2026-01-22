import { Product } from "@/data/products";
import { defaultProducts } from "@/data/products";

const STORAGE_KEY = "forgali_products";

// Load products from localStorage or use defaults
export const loadProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Save defaults to localStorage on first load
    saveProducts(defaultProducts);
    return defaultProducts;
  } catch (error) {
    console.error("Error loading products:", error);
    return defaultProducts;
  }
};

// Save products to localStorage
export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    // Dispatch custom event for product updates
    window.dispatchEvent(new CustomEvent("productsUpdated"));
  } catch (error) {
    console.error("Error saving products:", error);
  }
};

// Add a new product
export const addProduct = (product: Product): void => {
  const products = loadProducts();
  products.push(product);
  saveProducts(products);
};

// Update an existing product
export const updateProduct = (id: string, updates: Partial<Product>): void => {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

// Delete a product
export const deleteProduct = (id: string): void => {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveProducts(filtered);
};

// Apply sale to product(s)
export const applySale = (productIds: string[], discountPercent: number): void => {
  const products = loadProducts();
  products.forEach((product) => {
    if (productIds.includes(product.id)) {
      const originalPrice = product.originalPrice || product.price;
      const newPrice = Math.round(originalPrice * (1 - discountPercent / 100));
      updateProduct(product.id, {
        originalPrice,
        price: newPrice,
        badge: "sale",
      });
    }
  });
};

// Remove sale from product(s)
export const removeSale = (productIds: string[]): void => {
  const products = loadProducts();
  products.forEach((product) => {
    if (productIds.includes(product.id) && product.originalPrice) {
      updateProduct(product.id, {
        price: product.originalPrice,
        originalPrice: undefined,
        badge: product.badge === "sale" ? undefined : product.badge,
      });
    }
  });
};

// Export products to JSON
export const exportProducts = (): string => {
  const products = loadProducts();
  return JSON.stringify(products, null, 2);
};

// Import products from JSON
export const importProducts = (json: string): boolean => {
  try {
    const products = JSON.parse(json);
    if (Array.isArray(products)) {
      saveProducts(products);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error importing products:", error);
    return false;
  }
};

// Generate a unique ID for new products
export const generateProductId = (): string => {
  const products = loadProducts();
  const maxId = Math.max(...products.map((p) => parseInt(p.id) || 0), 0);
  return String(maxId + 1);
};
