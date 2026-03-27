// Shopify Storefront API Integration
// You'll need to set these environment variables:
// VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
// VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2025-01';

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('Shopify Configuration:', {
    storeDomain: SHOPIFY_STORE_DOMAIN ? `${SHOPIFY_STORE_DOMAIN.substring(0, 10)}...` : 'NOT SET',
    hasToken: !!STOREFRONT_ACCESS_TOKEN,
    tokenLength: STOREFRONT_ACCESS_TOKEN?.length || 0,
    apiUrl: SHOPIFY_API_URL,
  });
}

// GraphQL query to fetch products with variant images and tags
const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 30) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                }
                availableForSale
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      tags
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 30) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
            }
            availableForSale
            quantityAvailable
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch products by collection handle
const PRODUCTS_BY_COLLECTION_QUERY = `
  query getProductsByCollection($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            handle
            tags
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to create a cart
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL query to add items to cart
const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL query to get cart
const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                }
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Shopify credentials not configured. Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.');
  }

  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  // Check HTTP status before parsing JSON
  if (!response.ok) {
    let errorMessage = `Shopify API Error: HTTP ${response.status}`;
    
    if (response.status === 401) {
      errorMessage = 'Shopify API Authentication Failed (401). Please check:\n' +
        '1. Your Storefront API access token is correct\n' +
        '2. Environment variables are set in Vercel (VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN)\n' +
        '3. The token has the required scopes: unauthenticated_read_product_listings, unauthenticated_write_checkouts, unauthenticated_read_checkouts\n' +
        '4. The store domain is correct (format: your-store.myshopify.com)';
    } else if (response.status === 402) {
      errorMessage = 'Shopify Store Unavailable (402). Your Shopify store needs to be activated:\n' +
        '1. Go to your Shopify Admin: https://' + SHOPIFY_STORE_DOMAIN + '/admin\n' +
        '2. Complete your store setup if you see a setup wizard\n' +
        '3. If your trial expired, choose a Shopify plan (Basic Shopify, Shopify, etc.)\n' +
        '4. If your store is paused, reactivate it in Settings → Plan\n' +
        '5. Once your store is active, try checkout again';
    } else if (response.status === 403) {
      errorMessage = 'Shopify API Forbidden (403). The access token may not have the required permissions.';
    } else if (response.status === 404) {
      errorMessage = 'Shopify API Not Found (404). Check that your store domain is correct.';
    }
    
    // Try to get error details from response body
    try {
      const errorData = await response.json();
      if (errorData.errors && Array.isArray(errorData.errors)) {
        errorMessage += '\n' + errorData.errors.map((e: any) => e.message || JSON.stringify(e)).join(', ');
      }
    } catch {
      // If response isn't JSON, use status text
      errorMessage += ` - ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }

  const result: ShopifyResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(`Shopify API Error: ${result.errors.map(e => e.message).join(', ')}`);
  }

  if (!result.data) {
    throw new Error('No data returned from Shopify API');
  }

  return result.data;
}

// Check if Shopify is configured
export const isShopifyConfigured = (): boolean => {
  return !!(SHOPIFY_STORE_DOMAIN && STOREFRONT_ACCESS_TOKEN);
};

// TypeScript interfaces for Shopify data
export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string } | null;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: ShopifyImage | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  tags: string[];
  productType: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice?: { amount: string; currencyCode: string };
  };
  featuredImage?: ShopifyImage | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  options?: Array<{ id: string; name: string; values: string[] }>;
  variants: { edges: Array<{ node: ShopifyVariant }> };
}

// Fetch products from Shopify
export const fetchShopifyProducts = async (first: number = 50, after?: string) => {
  const data = await shopifyFetch<{
    products: {
      pageInfo: { hasNextPage: boolean; endCursor: string };
      edges: Array<{ node: ShopifyProduct }>;
    };
  }>(PRODUCTS_QUERY, { first, after });

  return data.products;
};

// Fetch all products (handles pagination)
export const fetchAllShopifyProducts = async (): Promise<ShopifyProduct[]> => {
  const allProducts: ShopifyProduct[] = [];
  let hasNextPage = true;
  let cursor: string | undefined;

  while (hasNextPage) {
    const result = await fetchShopifyProducts(50, cursor);
    allProducts.push(...result.edges.map(edge => edge.node));
    hasNextPage = result.pageInfo.hasNextPage;
    cursor = result.pageInfo.endCursor;
  }

  return allProducts;
};

// Fetch a single product by handle
export const fetchShopifyProductByHandle = async (handle: string): Promise<ShopifyProduct | null> => {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.productByHandle;
};

// Fetch products by collection handle
export const fetchShopifyProductsByCollection = async (
  collectionHandle: string,
  first: number = 50,
  after?: string
) => {
  const data = await shopifyFetch<{
    collectionByHandle: {
      id: string;
      title: string;
      description: string;
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string };
        edges: Array<{ node: ShopifyProduct }>;
      };
    } | null;
  }>(PRODUCTS_BY_COLLECTION_QUERY, { handle: collectionHandle, first, after });

  return data.collectionByHandle;
};

// Create a new cart
export const createShopifyCart = async () => {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(CREATE_CART_MUTATION, {
    input: {},
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map(e => e.message).join(', '));
  }

  return data.cartCreate.cart;
};

// Add items to cart
export const addToShopifyCart = async (cartId: string, variantId: string, quantity: number) => {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: {
        id: string;
        checkoutUrl: string;
        lines: {
          edges: Array<{
            node: {
              id: string;
              quantity: number;
              merchandise: {
                id: string;
                title: string;
                product: { title: string };
                price: { amount: string; currencyCode: string };
                image?: { url: string; altText: string };
              };
            };
          }>;
        };
        cost: { totalAmount: { amount: string; currencyCode: string } };
      };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map(e => e.message).join(', '));
  }

  return data.cartLinesAdd.cart;
};

// Get cart details
export const getShopifyCart = async (cartId: string) => {
  const data = await shopifyFetch<{
    cart: {
      id: string;
      checkoutUrl: string;
      lines: {
        edges: Array<{
          node: {
            id: string;
            quantity: number;
            merchandise: {
              id: string;
              title: string;
              product: { title: string };
              price: { amount: string; currencyCode: string };
              image?: { url: string; altText: string };
            };
          };
        }>;
      };
      cost: { totalAmount: { amount: string; currencyCode: string } };
    };
  }>(GET_CART_QUERY, { cartId });

  return data.cart;
};

// Category type for products
export type ProductCategory = "bunk-beds" | "loft-beds" | "single-beds" | "accessories" | "mattresses";

// Helper to extract category from tags, productType, or handle
export const getCategoryFromProduct = (product: ShopifyProduct): ProductCategory => {
  const tags = product.tags.map(t => t.toLowerCase());
  const productType = product.productType?.toLowerCase() || '';
  const handle = product.handle.toLowerCase();
  const title = product.title.toLowerCase();

  // Check tags first (most reliable)
  if (tags.includes('bunk-beds') || tags.includes('bunk bed') || tags.includes('bunk')) return 'bunk-beds';
  if (tags.includes('loft-beds') || tags.includes('loft bed') || tags.includes('loft')) return 'loft-beds';
  if (tags.includes('single-beds') || tags.includes('single bed') || tags.includes('platform')) return 'single-beds';
  if (tags.includes('mattresses') || tags.includes('mattress')) return 'mattresses';
  if (tags.includes('accessories') || tags.includes('storage') || tags.includes('dresser')) return 'accessories';

  // Check product type
  if (productType.includes('bunk')) return 'bunk-beds';
  if (productType.includes('loft')) return 'loft-beds';
  if (productType.includes('mattress')) return 'mattresses';

  // Check handle and title
  if (handle.includes('bunk') || title.includes('bunk')) return 'bunk-beds';
  if (handle.includes('loft') || title.includes('loft')) return 'loft-beds';
  if (handle.includes('mattress') || title.includes('mattress')) return 'mattresses';
  if (handle.includes('dresser') || handle.includes('storage') || title.includes('dresser')) return 'accessories';

  return 'single-beds';
};

// Known finish/color values to extract from tags
const FINISH_TAGS = ['white', 'natural', 'espresso', 'chestnut', 'grey', 'gray', 'pecan', 'walnut', 'driftwood', 'clay', 'blue'];

// Helper to extract finishes from product tags
export const getFinishesFromTags = (tags: string[]): string[] => {
  const finishes: string[] = [];
  const lowerTags = tags.map(t => t.toLowerCase());
  
  for (const finish of FINISH_TAGS) {
    if (lowerTags.includes(finish)) {
      finishes.push(finish.charAt(0).toUpperCase() + finish.slice(1));
    }
  }
  
  return finishes;
};

// Helper to get subcategory from tags (matches Shopify tag structure)
export const getSubcategoryFromProduct = (product: ShopifyProduct): string => {
  const tags = product.tags.map(t => t.toLowerCase());
  const tagStr = product.tags.join(' ').toLowerCase();
  
  // Bunk bed subcategories
  if (tags.some(t => t.includes('twin over twin') || t === 'twin over twin bunk bed')) return 'twin-over-twin';
  if (tags.some(t => t.includes('twin over full'))) return 'twin-over-full';
  if (tags.some(t => t.includes('full over full') || t === 'full over full bunk bed')) return 'full-over-full';
  if (tags.some(t => t.includes('twin xl over queen'))) return 'twin-xl-over-queen';
  if (tags.some(t => t.includes('l-shaped') || t.includes('corner loft bunk'))) return 'l-shaped';
  if (tags.some(t => t.includes('trio') || t.includes('quad') || t.includes('triple'))) return 'multi-bunk';
  if (tags.some(t => t.includes('low bunk'))) return 'low-bunk';
  if (tagStr.includes('bunk bed with slide') || tagStr.includes('bunk beds with slides')) return 'with-slide';
  if (tagStr.includes('bunk bed with stairs') || tagStr.includes('with stairs')) return 'with-stairs';
  
  // Loft bed subcategories
  if (tags.some(t => t === 'low loft bed' || t.includes('low loft'))) return 'low-loft';
  if (tags.some(t => t === 'mid loft bed' || t.includes('mid loft'))) return 'mid-loft';
  if (tags.some(t => t === 'high loft bed' || t.includes('high loft') || t.includes('ultra high'))) return 'high-loft';
  if (tags.some(t => t.includes('corner loft') && !t.includes('bunk'))) return 'corner-loft';
  if (tagStr.includes('loft beds > play beds') || tagStr.includes('slide')) return 'loft-with-slide';
  if (tags.some(t => t.includes('desk') || t.includes('all in one'))) return 'loft-with-desk';
  
  // Single bed subcategories
  if (tags.some(t => t.includes('platform'))) return 'platform';
  if (tags.some(t => t.includes('castle') || t.includes('house'))) return 'house-bed';
  if (tags.some(t => t.includes('toddler') || t.includes('floor'))) return 'floor-bed';
  if (tags.some(t => t.includes('traditional'))) return 'traditional';
  if (tags.some(t => t.includes('trundle'))) return 'trundle-bed';
  
  // Accessories subcategories  
  if (tags.some(t => t.includes('dresser') || t.includes('storage') || t.includes('drawer'))) return 'storage';
  if (tags.some(t => t.includes('desk'))) return 'desks';
  if (tags.some(t => t.includes('bookcase') || t.includes('shelf'))) return 'bookcases-shelves';
  if (tags.some(t => t.includes('nightstand') || t.includes('night stand'))) return 'nightstands';
  
  return '';
};

// Converted product interface (for use in React components)
export interface ConvertedProduct {
  id: string;
  shopifyId: string;
  handle: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: ProductCategory;
  subcategory: string;
  tags: string[];
  colors: string[];
  finishes: string[];
  badge?: "new" | "bestseller" | "sale";
  rating: number;
  reviews: number;
  description: string;
  descriptionHtml?: string;
  productUrl: string;
  availableForSale: boolean;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    availableForSale: boolean;
    image?: string;
    options: Array<{ name: string; value: string }>;
  }>;
  options: Array<{ name: string; values: string[] }>;
}

// Helper to convert Shopify product to our Product format
export const convertShopifyProduct = (shopifyProduct: ShopifyProduct): ConvertedProduct => {
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const variants = shopifyProduct.variants.edges.map(edge => edge.node);
  const firstVariant = variants[0];
  
  const price = parseFloat(firstVariant?.price.amount || shopifyProduct.priceRange.minVariantPrice.amount);
  const originalPrice = firstVariant?.compareAtPrice?.amount 
    ? parseFloat(firstVariant.compareAtPrice.amount) 
    : undefined;

  // Extract finishes from tags (since products don't have variant options)
  const finishesFromTags = getFinishesFromTags(shopifyProduct.tags);
  
  // Also try to get from variant options if they exist
  const finishSet = new Set<string>(finishesFromTags);
  const colorSet = new Set<string>();
  
  variants.forEach(variant => {
    variant.selectedOptions.forEach(opt => {
      const name = opt.name.toLowerCase();
      if (name === 'finish' || name === 'wood finish' || name === 'color') {
        if (opt.value !== 'Default Title') {
          finishSet.add(opt.value);
        }
      }
      if (name === 'color' && opt.value !== 'Default Title') {
        colorSet.add(opt.value);
      }
    });
  });

  // Build options - if products don't have variant options, create from tags
  let options = shopifyProduct.options?.map(opt => ({
    name: opt.name,
    values: opt.values,
  })).filter(opt => opt.name !== 'Title' || !opt.values.includes('Default Title')) || [];
  
  // If no finish option exists but we have finishes from tags, add it
  if (finishSet.size > 0 && !options.some(o => o.name.toLowerCase() === 'finish' || o.name.toLowerCase() === 'color')) {
    options = [{ name: 'Finish', values: Array.from(finishSet) }, ...options];
  }

  // Convert variants with their images
  const convertedVariants = variants.map(v => ({
    id: v.id,
    title: v.title,
    price: parseFloat(v.price.amount),
    compareAtPrice: v.compareAtPrice?.amount ? parseFloat(v.compareAtPrice.amount) : undefined,
    availableForSale: v.availableForSale,
    image: v.image?.url,
    options: v.selectedOptions,
  }));

  const category = getCategoryFromProduct(shopifyProduct);
  const subcategory = getSubcategoryFromProduct(shopifyProduct);

  return {
    id: shopifyProduct.id,
    shopifyId: shopifyProduct.id,
    handle: shopifyProduct.handle,
    name: shopifyProduct.title,
    price,
    originalPrice,
    image: shopifyProduct.featuredImage?.url || images[0] || '',
    images,
    category,
    subcategory,
    tags: shopifyProduct.tags, // Include raw tags for filtering
    colors: Array.from(colorSet),
    finishes: Array.from(finishSet),
    badge: originalPrice ? "sale" as const : undefined,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    productUrl: `https://${SHOPIFY_STORE_DOMAIN}/products/${shopifyProduct.handle}`,
    availableForSale: variants.some(v => v.availableForSale),
    variants: convertedVariants,
    options,
  };
};

// Get images for a specific variant/finish
export const getVariantImages = (product: ConvertedProduct, finishValue?: string): string[] => {
  if (!finishValue || product.variants.length <= 1) {
    return product.images;
  }

  // Find variants that match the finish value
  const matchingVariants = product.variants.filter(v => 
    v.options.some(opt => 
      (opt.name.toLowerCase() === 'finish' || opt.name.toLowerCase() === 'color') && 
      opt.value === finishValue
    )
  );

  // Collect variant-specific images
  const variantImages = matchingVariants
    .map(v => v.image)
    .filter((img): img is string => !!img);

  // If we have variant images, use those; otherwise fall back to product images
  return variantImages.length > 0 ? variantImages : product.images;
};

// Get variant ID for a specific finish/color selection
export const getVariantIdForOptions = (
  product: ConvertedProduct, 
  selectedOptions: Record<string, string>
): string | undefined => {
  const variant = product.variants.find(v => 
    Object.entries(selectedOptions).every(([name, value]) =>
      v.options.some(opt => 
        opt.name.toLowerCase() === name.toLowerCase() && opt.value === value
      )
    )
  );
  return variant?.id;
};
