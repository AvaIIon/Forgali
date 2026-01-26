// Shopify Storefront API Integration
// You'll need to set these environment variables:
// VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
// VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2024-01';

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

// GraphQL query to fetch products
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
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
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
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
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

// Fetch products from Shopify
export const fetchShopifyProducts = async (first: number = 50, after?: string) => {
  const data = await shopifyFetch<{
    products: {
      pageInfo: { hasNextPage: boolean; endCursor: string };
      edges: Array<{
        node: {
          id: string;
          title: string;
          description: string;
          handle: string;
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          images: { edges: Array<{ node: { url: string; altText: string } }> };
          variants: {
            edges: Array<{
              node: {
                id: string;
                title: string;
                price: { amount: string; currencyCode: string };
                compareAtPrice?: { amount: string };
                availableForSale: boolean;
                selectedOptions: Array<{ name: string; value: string }>;
              };
            }>;
          };
        };
      }>;
    };
  }>(PRODUCTS_QUERY, { first, after });

  return data.products;
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

// Helper to convert Shopify product to our Product format
export const convertShopifyProduct = (shopifyProduct: any, variant?: any) => {
  const images = shopifyProduct.images.edges.map((edge: any) => edge.node.url);
  const price = parseFloat(variant?.price.amount || shopifyProduct.priceRange.minVariantPrice.amount);
  const originalPrice = variant?.compareAtPrice?.amount 
    ? parseFloat(variant.compareAtPrice.amount) 
    : undefined;

  // Extract category from product tags or handle
  const handle = shopifyProduct.handle.toLowerCase();
  let category: "bunk-beds" | "loft-beds" | "single-beds" | "accessories" | "mattresses" = "single-beds";
  
  if (handle.includes("bunk")) category = "bunk-beds";
  else if (handle.includes("loft")) category = "loft-beds";
  else if (handle.includes("mattress")) category = "mattresses";
  else if (handle.includes("accessory") || handle.includes("storage") || handle.includes("dresser")) category = "accessories";

  return {
    id: variant?.id || shopifyProduct.id,
    shopifyId: shopifyProduct.id,
    shopifyVariantId: variant?.id,
    name: shopifyProduct.title,
    price,
    originalPrice,
    image: images[0] || '',
    images,
    category,
    subcategory: '',
    colors: variant?.selectedOptions?.filter((opt: any) => opt.name.toLowerCase() === 'color').map((opt: any) => opt.value) || [],
    finishes: variant?.selectedOptions?.filter((opt: any) => opt.name.toLowerCase() === 'finish').map((opt: any) => opt.value) || [],
    badge: originalPrice ? "sale" as const : undefined,
    rating: 4.5,
    reviews: 0,
    description: shopifyProduct.description,
    productUrl: `https://${SHOPIFY_STORE_DOMAIN}/products/${shopifyProduct.handle}`,
    availableForSale: variant?.availableForSale ?? true,
  };
};
