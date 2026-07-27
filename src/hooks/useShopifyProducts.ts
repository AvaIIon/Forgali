import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchAllShopifyProducts,
  fetchShopifyProductByHandle,
  fetchBestSellingProducts,
  convertShopifyProduct,
  isShopifyConfigured,
  ConvertedProduct,
  ProductCategory,
} from '@/services/shopifyService';

// Cache for products to avoid refetching
let productsCache: ConvertedProduct[] | null = null;
let productsCacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
// Shared in-flight fetch so concurrent mounts (several homepage sections use
// this hook) join one catalog request instead of each firing their own.
let productsInflight: Promise<ConvertedProduct[]> | null = null;

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

      if (forceRefresh || !productsInflight) {
        productsInflight = fetchAllShopifyProducts()
          .then((shopifyProducts) => {
            const converted = shopifyProducts.map(convertShopifyProduct);
            // Update cache
            productsCache = converted;
            productsCacheTimestamp = Date.now();
            return converted;
          })
          .finally(() => {
            productsInflight = null;
          });
      }

      setProducts(await productsInflight);
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
  // true once the by-handle detail fetch has settled — cross-sell sections
  // must wait for it, or the generic fallback flashes before the curated one
  const [detailLoaded, setDetailLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

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

    // Cancellation guard: without it, fast navigation between products lets a
    // slow earlier response overwrite the newer product (rendering — and
    // adding to cart — the WRONG product).
    let cancelled = false;

    const fetchProduct = async () => {
      let paintedFromCache = false;
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setDetailLoaded(false);

        // Use the cached list version for an instant first paint, but DON'T stop
        // there: the list query (PRODUCTS_QUERY) fetches fewer images and
        // no variant SKUs, so the full gallery + specs only come from the by-handle
        // query below. Paint cached, then upgrade to full detail.
        if (productsCache) {
          const cached = productsCache.find(p =>
            p.handle === identifier ||
            p.id === identifier ||
            p.shopifyId === identifier
          );
          if (cached && !cancelled) {
            setProduct(cached);
            setLoading(false);
            paintedFromCache = true;
          }
        }

        // Fetch from API by handle (full detail: sku, up to 250 images, specs)
        const shopifyProduct = await fetchShopifyProductByHandle(identifier);
        if (cancelled) return;
        if (shopifyProduct) {
          setProduct(convertShopifyProduct(shopifyProduct));
          setDetailLoaded(true);
        } else if (paintedFromCache) {
          // Cached paint exists but the handle no longer resolves — treat the
          // cache as stale and show not-found rather than a ghost product.
          setProduct(null);
          setNotFound(true);
          setError('Product not found');
        } else {
          // If not found by handle, try loading all products and search
          const allProducts = await fetchAllShopifyProducts();
          if (cancelled) return;
          const found = allProducts.find(p =>
            p.handle === identifier ||
            p.id.includes(identifier)
          );
          if (found) {
            setProduct(convertShopifyProduct(found));
            setDetailLoaded(true);
          } else {
            setNotFound(true);
            setError('Product not found');
          }
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching product:', err);
        // Don't surface a hard error if we already painted a usable cached
        // version — the detail upgrade failing shouldn't blank the page.
        if (!paintedFromCache) {
          setError(err instanceof Error ? err.message : 'Failed to fetch product');
        } else {
          setDetailLoaded(true); // cached paint is final for this visit
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [identifier]);

  return { product, loading, error, detailLoaded, notFound };
};

// Homepage featured grid — Shopify's real BEST_SELLING ordering, replacing the
// old fabricated rating-based "Best Sellers" ranking.
let featuredCache: ConvertedProduct[] | null = null;
export const useFeaturedProducts = (count: number = 8) => {
  const [products, setProducts] = useState<ConvertedProduct[]>(featuredCache ?? []);
  const [loading, setLoading] = useState(!featuredCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (featuredCache) return;
    if (!isShopifyConfigured()) {
      setError('Shopify is not configured');
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchBestSellingProducts(Math.max(count * 2, 12))
      .then(nodes => {
        if (cancelled) return;
        featuredCache = nodes.map(convertShopifyProduct);
        setProducts(featuredCache);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Error fetching featured products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  const featured = useMemo(
    () => products.filter(p => p.availableForSale && p.image).slice(0, count),
    [products, count]
  );

  return { products: featured, loading, error };
};

// "bedroom" is an aggregate storefront category spanning the bed categories
const BEDROOM_CATEGORIES: ProductCategory[] = ["bunk-beds", "loft-beds", "single-beds"];

// Hook for fetching products by category
export const useShopifyProductsByCategory = (category: ProductCategory | "bedroom" | undefined) => {
  const { products, loading, error } = useShopifyProducts();

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    if (category === "bedroom") {
      return products.filter(p => BEDROOM_CATEGORIES.includes(p.category));
    }
    return products.filter(p => p.category === category);
  }, [products, category]);

  return { products: filteredProducts, loading, error };
};

// Hook for search functionality. Every word in the query must match somewhere
// in the product ("white bunk bed" is an AND of terms, not one literal string);
// results rank name matches above description/tag matches, in-stock first.
export const useShopifyProductSearch = (query: string) => {
  const { products, loading, error } = useShopifyProducts();

  const searchResults = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];

    const scored: Array<{ product: ConvertedProduct; score: number }> = [];
    for (const p of products) {
      const name = p.name.toLowerCase();
      const haystack = [
        name,
        p.description?.toLowerCase() ?? '',
        p.category,
        p.subcategory,
        p.productType.toLowerCase(),
        ...p.tags.map(t => t.toLowerCase()),
        ...p.finishes.map(f => f.toLowerCase()),
      ].join(' ');

      if (!terms.every(term => haystack.includes(term))) continue;

      const nameHits = terms.filter(term => name.includes(term)).length;
      scored.push({ product: p, score: nameHits * 2 + (p.availableForSale ? 1 : 0) });
    }

    return scored.sort((a, b) => b.score - a.score).map(s => s.product);
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
