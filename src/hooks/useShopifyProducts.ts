import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchAllShopifyProducts,
  fetchShopifyProductByHandle,
  convertShopifyProduct,
  isShopifyConfigured,
  ConvertedProduct,
  ProductCategory,
} from '@/services/shopifyService';

// Cache for products to avoid refetching
let productsCache: ConvertedProduct[] | null = null;
let productsCacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Hook for fetching all products
export const useShopifyProducts = () => {
  const [products, setProducts] = useState<ConvertedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (forceRefresh = false) => {
    if (!isShopifyConfigured()) {
      setError('Shopify is not configured');
      setLoading(false);
      return;
    }

    // Check cache
    const now = Date.now();
    if (!forceRefresh && productsCache && (now - productsCacheTimestamp) < CACHE_DURATION) {
      setProducts(productsCache);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const shopifyProducts = await fetchAllShopifyProducts();
      const converted = shopifyProducts.map(convertShopifyProduct);
      
      // Update cache
      productsCache = converted;
      productsCacheTimestamp = now;
      
      setProducts(converted);
    } catch (err) {
      console.error('Error fetching Shopify products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => fetchProducts(true), [fetchProducts]);

  return { products, loading, error, refetch };
};

// Hook for fetching a single product by handle or ID
export const useShopifyProduct = (identifier: string | undefined) => {
  const [product, setProduct] = useState<ConvertedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) {
      setLoading(false);
      return;
    }

    if (!isShopifyConfigured()) {
      setError('Shopify is not configured');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check cache by handle or id
        if (productsCache) {
          const cached = productsCache.find(p => 
            p.handle === identifier || 
            p.id === identifier ||
            p.shopifyId === identifier
          );
          if (cached) {
            setProduct(cached);
            setLoading(false);
            return;
          }
        }

        // Fetch from API by handle
        const shopifyProduct = await fetchShopifyProductByHandle(identifier);
        if (shopifyProduct) {
          const converted = convertShopifyProduct(shopifyProduct);
          setProduct(converted);
        } else {
          // If not found by handle, try loading all products and search
          const allProducts = await fetchAllShopifyProducts();
          const found = allProducts.find(p => 
            p.handle === identifier || 
            p.id.includes(identifier)
          );
          if (found) {
            const converted = convertShopifyProduct(found);
            setProduct(converted);
          } else {
            setError('Product not found');
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [identifier]);

  return { product, loading, error };
};

// Hook for fetching products by category
export const useShopifyProductsByCategory = (category: ProductCategory | undefined) => {
  const { products, loading, error } = useShopifyProducts();

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter(p => p.category === category);
  }, [products, category]);

  return { products: filteredProducts, loading, error };
};

// Hook for search functionality
export const useShopifyProductSearch = (query: string) => {
  const { products, loading, error } = useShopifyProducts();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category.includes(lowerQuery) ||
      p.subcategory.includes(lowerQuery)
    );
  }, [products, query]);

  return { results: searchResults, loading, error };
};

// Utility functions (non-hook)
export const getProductById = (products: ConvertedProduct[], id: string): ConvertedProduct | undefined => {
  return products.find(p => p.id === id || p.shopifyId === id);
};

export const getProductByHandle = (products: ConvertedProduct[], handle: string): ConvertedProduct | undefined => {
  return products.find(p => p.handle === handle);
};

export const getRelatedProducts = (
  products: ConvertedProduct[], 
  currentProduct: ConvertedProduct, 
  limit = 4
): ConvertedProduct[] => {
  return products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, limit);
};

// Clear cache (useful for admin operations)
export const clearProductsCache = () => {
  productsCache = null;
  productsCacheTimestamp = 0;
};
