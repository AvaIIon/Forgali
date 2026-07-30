// Shopify Storefront API Integration
// Optional environment override (Vercel): VITE_SHOPIFY_STORE_DOMAIN

// The PUBLIC Storefront API token for the Forgali Headless storefront.
// Committing this is deliberate, not an oversight: public Storefront tokens are
// designed to ship in client-side code. They are rate-limited per buyer IP and
// carry only unauthenticated_* scopes, which is exactly the access a browser
// needs. A private token is the opposite — server-side only — and one had been
// shipping in this bundle since launch, which is what this replaces.
// Source: Shopify admin > Headless > Forgali Headless > Storefront API.
//
// The token is NOT read from import.meta.env, and that is load-bearing: Vite
// inlines env values into the bundle as literal strings at build time. Merely
// referencing VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN would embed whatever Vercel
// holds — including the private token — as a readable string in the shipped
// JS, even if the code never sends it. Naming only the public token here is the
// only way the private one stays out of the bundle.
const PUBLIC_STOREFRONT_TOKEN = 'a657d35533c14d8ad23c908b75c56427';
const DEFAULT_STORE_DOMAIN = 'kjrq9s-yp.myshopify.com';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || DEFAULT_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = PUBLIC_STOREFRONT_TOKEN;

const API_VERSION = '2025-01';

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

const TOKEN_HEADER = 'X-Shopify-Storefront-Access-Token';

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
            maxVariantPrice {
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
          options {
            id
            name
            values
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                sku
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
      images(first: 250) {
        edges {
          node {
            url
            altText
          }
        }
      }
      metafields(identifiers: [
        { namespace: "specs", key: "dimensions" },
        { namespace: "specs", key: "material" },
        { namespace: "specs", key: "weight_capacity" },
        { namespace: "specs", key: "recommended_mattress" },
        { namespace: "specs", key: "assembly" }
      ]) {
        namespace
        key
        value
      }
      relatedProducts: metafield(namespace: "custom", key: "related_products") {
        references(first: 8) {
          nodes {
            ... on Product {
              handle
              title
              availableForSale
              featuredImage { url }
              priceRange {
                minVariantPrice { amount }
                maxVariantPrice { amount }
              }
              compareAtPriceRange { minVariantPrice { amount } }
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
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
      [TOKEN_HEADER]: STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  // Check HTTP status before parsing JSON
  if (!response.ok) {
    let errorMessage = `Shopify API Error: HTTP ${response.status}`;
    
    if (response.status === 401) {
      errorMessage = 'Shopify API Authentication Failed (401). Please check:\n' +
        '1. The public Storefront token in src/services/shopifyService.ts is still valid — Shopify admin > Headless > Forgali Headless > Storefront API\n' +
        '2. It has the required permissions: unauthenticated_read_product_listings, unauthenticated_write_checkouts, unauthenticated_read_checkouts\n' +
        '3. The store domain is correct (format: your-store.myshopify.com)';
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
  sku?: string | null;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string } | null;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: ShopifyImage | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
}

// Node shape of the custom.related_products metafield references
export interface ShopifyRelatedProductNode {
  handle?: string;
  title?: string;
  availableForSale?: boolean;
  featuredImage?: { url: string } | null;
  priceRange?: {
    minVariantPrice: { amount: string };
    maxVariantPrice?: { amount: string };
  };
  compareAtPriceRange?: { minVariantPrice: { amount: string } } | null;
}

// Lightweight cross-sell reference ("Complete the Room")
export interface RelatedProductRef {
  handle: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  // true when the product has multiple price points (sets, sizes) and the
  // shown price is the cheapest — display as "From $X"
  fromPrice: boolean;
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
  metafields?: Array<ShopifyMetafield | null>;
  relatedProducts?: { references?: { nodes: ShopifyRelatedProductNode[] } | null } | null;
  options?: Array<{ id: string; name: string; values: string[] }>;
  variants: { edges: Array<{ node: ShopifyVariant }> };
}

// Structured product specs (from Shopify `specs` metafields)
export interface ProductSpecs {
  dimensions?: string;
  material?: string;
  weightCapacity?: string;
  recommendedMattress?: string;
  assembly?: string;
}

// Fetch products from Shopify (250 = Storefront API page-size max; the whole
// 300+ product catalog loads in 2 round trips instead of 7)
export const fetchShopifyProducts = async (first: number = 250, after?: string) => {
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
    const result = await fetchShopifyProducts(250, cursor);
    allProducts.push(...result.edges.map(edge => edge.node));
    hasNextPage = result.pageInfo.hasNextPage;
    cursor = result.pageInfo.endCursor;
  }

  return allProducts;
};

// Shopify's real sales-ranked ordering for the homepage "Featured" grid —
// replaces the old fabricated rating*reviews ranking.
const BEST_SELLING_QUERY = PRODUCTS_QUERY
  .replace('query getProducts($first: Int!, $after: String) {', 'query getBestSelling($first: Int!) {')
  .replace('products(first: $first, after: $after) {', 'products(first: $first, sortKey: BEST_SELLING) {');

export const fetchBestSellingProducts = async (first: number = 12): Promise<ShopifyProduct[]> => {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(BEST_SELLING_QUERY, { first });
  return data.products.edges.map(e => e.node);
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

// Create a cart with ALL lines in one atomic call (per-line sequential adds
// could silently drop items and check out a subset). totalQuantity lets the
// caller verify nothing was dropped before redirecting to checkout.
export const createShopifyCartWithLines = async (
  lines: Array<{ merchandiseId: string; quantity: number }>
) => {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string; totalQuantity: number } | null;
      userErrors: Array<{ field: string[] | null; message: string }>;
    };
  }>(
    `mutation cartCreateWithLines($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl totalQuantity }
        userErrors { field message }
      }
    }`,
    { input: { lines } }
  );

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map(e => e.message).join(', '));
  }
  if (!data.cartCreate.cart) {
    throw new Error('Cart could not be created');
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
export type ProductCategory = "bunk-beds" | "loft-beds" | "single-beds" | "accessories" | "mattresses" | "dining" | "living";

// Plank & Beam furniture product types -> top-level category.
// Matched on Shopify productType (authoritative for the furniture range).
const DINING_TYPES = ['dining table', 'dining chair', 'dining set', 'dining bench', 'counter chair', 'bar chair', 'bar stool', 'counter stool', 'outdoor table'];
const LIVING_TYPES = ['coffee table', 'console table', 'side table', 'end table', 'sideboard', 'tv stand', 'media console', 'shelf', 'bookshelf', 'entryway bench', 'outdoor bench'];

// Helper to extract category from tags, productType, or handle.
// Live Shopify tags are hierarchical ("Bunk Beds > Twin Over Twin",
// "Accessories > DESKS & CHAIRS"), so matching must be by containment, never
// exact tag equality — and bed signals must win over accessory words like
// "storage" so a "platform bed with storage drawers" never leaves the bed
// categories.
export const getCategoryFromProduct = (product: ShopifyProduct): ProductCategory => {
  const productType = product.productType?.toLowerCase() || '';
  const handle = product.handle.toLowerCase();
  const title = product.title.toLowerCase();
  const tagText = product.tags.join(' | ').toLowerCase();
  const text = `${productType} ${title} ${handle}`;

  // Furniture product types are authoritative — check them before bed heuristics
  // so dining/living pieces never fall through to the "single-beds" default.
  if (DINING_TYPES.includes(productType)) return 'dining';
  if (LIVING_TYPES.includes(productType)) return 'living';

  // Beds first. Bunk beats loft for hybrids (corner/L-shaped loft-bunks and
  // low bunks carry both words; the nav places them under bunk beds).
  const isBunk = tagText.includes('bunk') || text.includes('bunk');
  const isLoft = tagText.includes('loft') || text.includes('loft');
  if (isBunk) return 'bunk-beds';
  if (isLoft) return 'loft-beds';

  if (productType.includes('mattress') || tagText.includes('mattress') || text.includes('mattress')) {
    return 'mattresses';
  }

  // Non-bed accessories (desks, dressers, bookcases, nightstands, storage).
  // Anything whose type/title/handle says "bed" stays a bed below.
  const accessoryWords = ['dresser', 'desk', 'bookcase', 'shelf', 'shelves', 'nightstand', 'storage', 'drawer'];
  if (
    productType === 'accessory' ||
    productType.includes('dresser') ||
    (accessoryWords.some(w => text.includes(w)) && !text.includes('bed'))
  ) {
    return 'accessories';
  }

  if (text.includes('bed') || tagText.includes('single beds') || tagText.includes('platform')) {
    return 'single-beds';
  }
  if (tagText.includes('accessor') || tagText.includes('dresser') || tagText.includes('storage')) {
    return 'accessories';
  }
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
  // true when variants span multiple price points and `price` is the cheapest
  // — cards should render "From $X"
  fromPrice: boolean;
  description: string;
  descriptionHtml?: string;
  productType: string;
  specs: ProductSpecs;
  productUrl: string;
  availableForSale: boolean;
  variants: Array<{
    id: string;
    title: string;
    sku?: string;
    price: number;
    compareAtPrice?: number;
    availableForSale: boolean;
    image?: string;
    options: Array<{ name: string; value: string }>;
  }>;
  options: Array<{ name: string; values: string[] }>;
  // Curated same-style cross-sells from custom.related_products (by-handle
  // query only — list-query products won't have this)
  relatedProducts?: RelatedProductRef[];
}

// Parse the Storefront `specs` metafields into a typed object
const parseSpecs = (metafields?: Array<ShopifyMetafield | null>): ProductSpecs => {
  const specs: ProductSpecs = {};
  if (!metafields) return specs;
  for (const mf of metafields) {
    if (!mf || !mf.value) continue;
    switch (mf.key) {
      case 'dimensions': specs.dimensions = mf.value; break;
      case 'material': specs.material = mf.value; break;
      case 'weight_capacity': specs.weightCapacity = mf.value; break;
      case 'recommended_mattress': specs.recommendedMattress = mf.value; break;
      case 'assembly': specs.assembly = mf.value; break;
    }
  }
  return specs;
};

// Helper to convert Shopify product to our Product format
export const convertShopifyProduct = (shopifyProduct: ShopifyProduct): ConvertedProduct => {
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const variants = shopifyProduct.variants.edges.map(edge => edge.node);

  // Card price = the cheapest variant a shopper can ACTUALLY BUY (price sorts,
  // "Under $X" filters, and card displays must all agree with what they can
  // pay). Prefer in-stock, positively-priced variants; only fall back to the
  // full set when nothing is available, so we never advertise a "From $X" the
  // shopper can't purchase or a $0 placeholder. compareAt is paired from the
  // SAME variant so a strikethrough is never borrowed from a different price.
  const positive = variants.filter(v => parseFloat(v.price?.amount || '0') > 0);
  const buyable = positive.filter(v => v.availableForSale);
  const priceable = buyable.length > 0 ? buyable : (positive.length > 0 ? positive : variants);
  const minVariant = priceable.reduce<ShopifyVariant | undefined>((min, v) => {
    if (!v.price?.amount) return min;
    if (!min || parseFloat(v.price.amount) < parseFloat(min.price.amount)) return v;
    return min;
  }, undefined);
  const price = parseFloat(
    minVariant?.price.amount || shopifyProduct.priceRange.minVariantPrice.amount
  );
  const maxVariantPrice = priceable.reduce(
    (max, v) => Math.max(max, parseFloat(v.price?.amount || '0')),
    price
  );
  const fromPrice = maxVariantPrice > price;
  const minCompareAt = minVariant?.compareAtPrice?.amount
    ? parseFloat(minVariant.compareAtPrice.amount)
    : undefined;
  const originalPrice = minCompareAt && minCompareAt > price ? minCompareAt : undefined;

  // Finishes from tags (search/filter metadata only — NOT a variant selector;
  // painting tag-derived swatches used to create phantom options that mapped
  // to no variant)
  const finishSet = new Set<string>(getFinishesFromTags(shopifyProduct.tags));
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

  // Real variant options only (drop the Default Title placeholder axis)
  const options = shopifyProduct.options?.map(opt => ({
    name: opt.name,
    values: opt.values,
  })).filter(opt => opt.name !== 'Title' || !opt.values.includes('Default Title')) || [];

  // Convert variants with their images
  const convertedVariants = variants.map(v => ({
    id: v.id,
    title: v.title,
    sku: v.sku || undefined,
    price: parseFloat(v.price.amount),
    compareAtPrice: v.compareAtPrice?.amount ? parseFloat(v.compareAtPrice.amount) : undefined,
    availableForSale: v.availableForSale,
    image: v.image?.url,
    options: v.selectedOptions,
  }));

  const category = getCategoryFromProduct(shopifyProduct);
  const subcategory = getSubcategoryFromProduct(shopifyProduct);

  // Map curated cross-sell references (custom.related_products metafield)
  const relatedProducts: RelatedProductRef[] | undefined =
    shopifyProduct.relatedProducts?.references?.nodes
      ?.filter((n): n is Required<Pick<ShopifyRelatedProductNode, 'handle' | 'title'>> & ShopifyRelatedProductNode =>
        Boolean(n?.handle && n?.title))
      .map(n => {
        const refPrice = parseFloat(n.priceRange?.minVariantPrice.amount || '0');
        const refMax = parseFloat(n.priceRange?.maxVariantPrice?.amount || '0');
        const refFromPrice = refMax > refPrice;
        // The ranges are aggregates across variants, so min price and min
        // compareAt can come from DIFFERENT variants — only show a
        // strikethrough when the product has a single price point, where the
        // pairing is unambiguous.
        const refCompare = !refFromPrice && n.compareAtPriceRange?.minVariantPrice.amount
          ? parseFloat(n.compareAtPriceRange.minVariantPrice.amount)
          : undefined;
        return {
          handle: n.handle,
          title: n.title,
          image: n.featuredImage?.url || '',
          price: refPrice,
          compareAtPrice: refCompare && refCompare > refPrice ? refCompare : undefined,
          availableForSale: n.availableForSale ?? true,
          fromPrice: refFromPrice,
        };
      });

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
    fromPrice,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    productType: shopifyProduct.productType || '',
    specs: parseSpecs(shopifyProduct.metafields),
    productUrl: `https://${SHOPIFY_STORE_DOMAIN}/products/${shopifyProduct.handle}`,
    availableForSale: variants.some(v => v.availableForSale),
    variants: convertedVariants,
    options,
    relatedProducts: relatedProducts?.length ? relatedProducts : undefined,
  };
};

// Get the full set of images to show for a selected finish.
// Shopify allows only ONE image per variant, so keying the gallery off
// variant.image collapses it to 1–3 thumbnails even though the product holds
// 8–30 photos. For the Plank & Beam range the full manufacturer photo set was
// uploaded with SKU-encoded filenames (`{SKU}__{angle}.jpg`), so we can recover
// every angle of the selected finish by matching those filenames. For beds
// (no SKU-encoded set) we show the finish hero first, then the whole gallery.
const dedupeBy = (urls: string[], keyFn: (u: string) => string): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    const key = keyFn(url);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(url);
    }
  }
  return out;
};

// ANGLE-only key ({SKU}__{angle} -> "angle"): used ONLY within a single
// finish's SKU set, where the quantity tiers (Individual / Set-of-2 / Set-of-4)
// share identical photos under different SKU prefixes but the SAME angle.
const angleKey = (url: string): string => {
  const m = url.toLowerCase().match(/__([^_./?]+)/);
  return m ? m[1] : url.toLowerCase();
};

// SKU+ANGLE key ({SKU}__{angle}, dropping a trailing _uuid + extension +
// ?v=): used for the WHOLE gallery. It collapses the same photo re-uploaded
// with a different CDN version/uuid, but PRESERVES distinct finishes (different
// SKU prefix) and distinct angles — angle-only keying wrongly merged different
// finishes that share an angle number.
const skuAngleKey = (url: string): string => {
  const file = (url.split('?')[0].split('/').pop() || url).toLowerCase();
  const m = file.match(/^(.*__[^_./?]+)/);
  return m ? m[1] : file;
};

// P&B photo sets were uploaded once per quantity-tier SKU, so a finish-wide SKU
// union returns each angle 2-3x — dedupe those by angle within the finish set.
const dedupeByAngle = (urls: string[]): string[] => dedupeBy(urls, angleKey);
const dedupeGallery = (urls: string[]): string[] => dedupeBy(urls, skuAngleKey);

export const getVariantImages = (
  product: ConvertedProduct,
  finishValue?: string,
  preferredSku?: string
): string[] => {
  const all = product.images.length > 0 ? product.images : [product.image].filter(Boolean);

  // No finish selected / single-variant: the WHOLE gallery. Dedupe by SKU+angle
  // so re-uploads collapse but different finishes' photos are all kept.
  if (!finishValue || product.variants.length <= 1) {
    return dedupeGallery(all);
  }

  // The selected variant's own SKU is the cleanest angle set when it exists
  if (preferredSku) {
    const own = all.filter(url => url.toLowerCase().includes(`${preferredSku.toLowerCase()}__`));
    if (own.length > 1) return dedupeByAngle(own);
  }

  // Variants matching the selected finish
  const matchingVariants = product.variants.filter(v =>
    v.options.some(opt =>
      ['finish', 'color', 'wood finish'].includes(opt.name.toLowerCase()) &&
      opt.value === finishValue
    )
  );

  // Plank & Beam: filenames encode the variant SKU -> the finish's full angle set
  const skus = matchingVariants
    .map(v => (v.sku || '').toLowerCase())
    .filter(Boolean);
  if (skus.length > 0) {
    const skuMatched = all.filter(url =>
      skus.some(sku => url.toLowerCase().includes(`${sku}__`))
    );
    if (skuMatched.length > 1) return dedupeByAngle(skuMatched);
  }

  // Beds / non-SKU products: finish hero(s) first, then the rest of the gallery
  const heroes = matchingVariants
    .map(v => v.image)
    .filter((img): img is string => !!img);
  if (heroes.length > 0) {
    return dedupeGallery([...heroes, ...all]);
  }

  return dedupeGallery(all);
};

// Live price/availability for a set of variant ids in ONE request — used to
// revalidate persisted cart lines (prices frozen at add time can drift from
// what the hosted checkout will actually charge, and variants can be deleted).
export const fetchVariantStates = async (
  variantIds: string[]
): Promise<Map<string, { price: number; availableForSale: boolean; title: string }>> => {
  const out = new Map<string, { price: number; availableForSale: boolean; title: string }>();
  if (variantIds.length === 0) return out;
  const data = await shopifyFetch<{
    nodes: Array<
      | { id: string; price: { amount: string }; availableForSale: boolean; product: { title: string } }
      | null
    >;
  }>(
    `query variantStates($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant {
          id
          availableForSale
          price { amount }
          product { title }
        }
      }
    }`,
    { ids: variantIds }
  );
  for (const node of data.nodes) {
    if (node && 'price' in node && node.price) {
      out.set(node.id, {
        price: parseFloat(node.price.amount),
        availableForSale: node.availableForSale,
        title: node.product?.title ?? '',
      });
    }
  }
  return out;
};

// Query a cart by id; Shopify returns null once the cart's checkout has been
// completed — which is the only signal a headless SPA gets that the customer
// actually paid.
export const fetchCartStatus = async (cartId: string): Promise<'open' | 'completed'> => {
  const data = await shopifyFetch<{ cart: { id: string } | null }>(
    `query cartStatus($id: ID!) { cart(id: $id) { id } }`,
    { id: cartId }
  );
  return data.cart ? 'open' : 'completed';
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

// ---------------------------------------------------------------------------
// Customer accounts (classic Shopify customer API via the Storefront token)
// ---------------------------------------------------------------------------

export interface ShopifyCustomer {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

type CustomerUserError = { message: string };

export const customerRegister = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{ ok: true } | { ok: false; message: string }> => {
  const data = await shopifyFetch<{
    customerCreate: { customer: { id: string } | null; customerUserErrors: CustomerUserError[] };
  }>(
    `mutation($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { message }
      }
    }`,
    { input }
  );
  const errs = data.customerCreate.customerUserErrors;
  if (errs?.length) return { ok: false, message: errs.map(e => e.message).join(' ') };
  return { ok: true };
};

// Newsletter signup (WELCOME10 capture). The Storefront API has no
// email-only subscribe, so this creates a customer with acceptsMarketing=true
// and a strong random password — the standard headless pattern; the customer
// can claim the account later via password reset. An already-registered email
// is reported as alreadySubscribed, not an error.
export const subscribeEmail = async (
  email: string
): Promise<{ ok: true; alreadySubscribed: boolean } | { ok: false; message: string }> => {
  // Shopify caps customer passwords at 40 characters
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const password = 'Fg9!' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string } | null;
      customerUserErrors: Array<{ code: string | null; message: string }>;
    };
  }>(
    `mutation($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { code message }
      }
    }`,
    { input: { email, password, acceptsMarketing: true } }
  );
  const errs = data.customerCreate.customerUserErrors;
  if (errs?.length) {
    const taken = errs.some(
      e => e.code === 'TAKEN' || /taken|already/i.test(e.message)
    );
    if (taken) return { ok: true, alreadySubscribed: true };
    return { ok: false, message: errs.map(e => e.message).join(' ') };
  }
  if (!data.customerCreate.customer) {
    return { ok: false, message: 'Signup did not complete — please try again.' };
  }
  return { ok: true, alreadySubscribed: false };
};

export const customerLogin = async (
  email: string,
  password: string
): Promise<{ ok: true; token: string; expiresAt: string } | { ok: false; message: string }> => {
  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(
    `mutation($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { message }
      }
    }`,
    { input: { email, password } }
  );
  const t = data.customerAccessTokenCreate.customerAccessToken;
  if (!t) {
    const msg =
      data.customerAccessTokenCreate.customerUserErrors?.map(e => e.message).join(' ') ||
      'Incorrect email or password.';
    return { ok: false, message: msg };
  }
  return { ok: true, token: t.accessToken, expiresAt: t.expiresAt };
};

export const customerFetch = async (token: string): Promise<ShopifyCustomer | null> => {
  const data = await shopifyFetch<{ customer: ShopifyCustomer | null }>(
    `query($token: String!) {
      customer(customerAccessToken: $token) { firstName lastName email }
    }`,
    { token }
  );
  return data.customer;
};

export const customerLogout = async (token: string): Promise<void> => {
  try {
    await shopifyFetch(
      `mutation($token: String!) {
        customerAccessTokenDelete(customerAccessToken: $token) {
          deletedAccessToken
          userErrors { message }
        }
      }`,
      { token }
    );
  } catch {
    // best-effort: local sign-out proceeds regardless
  }
};
