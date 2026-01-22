# Shopify Integration Setup Guide

This guide will help you connect your Forgali store to Shopify.

## Prerequisites

- A Shopify store (if you don't have one, sign up at [shopify.com](https://www.shopify.com))
- Admin access to your Shopify store

## Step 1: Get Your Shopify Storefront API Credentials

1. Log in to your Shopify admin panel
2. Go to **Settings** > **Apps and sales channels**
3. Click **Develop apps** (if you don't see this, you may need to enable developer mode)
4. Click **Create an app**
5. Name your app (e.g., "Forgali Storefront")
6. Click **Create app**
7. Click **Configure Admin API scopes** - you don't need to configure this for Storefront API
8. Click **Configure Storefront API scopes**
9. Enable the following scopes:
   - `unauthenticated_read_product_listings` - To fetch products
   - `unauthenticated_write_checkouts` - To create carts and checkout
   - `unauthenticated_read_checkouts` - To read cart information
10. Click **Save**
11. Click **Install app**
12. After installation, you'll see **Storefront API access token** - **Copy this token** (you won't be able to see it again!)

## Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Shopify credentials:
   ```
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

   Replace:
   - `your-store.myshopify.com` with your actual Shopify store domain (e.g., `forgali.myshopify.com`)
   - `your-storefront-access-token` with the token you copied in Step 1

3. **Important**: Never commit your `.env` file to git! It's already in `.gitignore`

## Step 3: Sync Products from Shopify

The integration will automatically fetch products from your Shopify store. Make sure your products in Shopify have:

- **Product titles** that match your current product names
- **Product images** uploaded
- **Variants** set up for different colors/finishes
- **Product tags** or handles that help categorize (e.g., "bunk-beds", "loft-beds")

## Step 4: Product Mapping

The system will automatically try to categorize products based on their handle/URL:
- Products with "bunk" in the handle → Bunk Beds
- Products with "loft" in the handle → Loft Beds
- Products with "mattress" in the handle → Mattresses
- Products with "accessory", "storage", or "dresser" → Accessories
- Everything else → Single Beds

You can manually adjust categories in the admin dashboard.

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any Shopify API errors
3. Try adding a product to cart
4. The checkout will redirect to Shopify's secure checkout

## How It Works

### Product Display
- Products are fetched from Shopify using the Storefront API
- The app displays Shopify products alongside your existing products
- Products sync automatically when you update them in Shopify

### Cart & Checkout
- When customers add items to cart, a Shopify cart is created
- Cart is stored in localStorage and synced with Shopify
- Checkout redirects to Shopify's secure checkout page
- All payment processing happens through Shopify

### Admin Dashboard
- Your admin dashboard still works for managing local products
- Shopify products are read-only in the admin (manage them in Shopify admin)
- You can still apply sales and manage local inventory

## Troubleshooting

### "Shopify credentials not configured" error
- Make sure your `.env` file exists and has the correct variables
- Restart your dev server after adding environment variables
- Check that variable names start with `VITE_`

### Products not showing
- Verify your Storefront API token has the correct scopes
- Check browser console for API errors
- Ensure products are published in Shopify

### Cart not working
- Make sure `unauthenticated_write_checkouts` scope is enabled
- Check that products have available variants
- Verify your store domain is correct (no `https://`, just `store.myshopify.com`)

## Next Steps

1. **Import your products to Shopify** - Use Shopify's import feature or add them manually
2. **Set up payment methods** - Configure in Shopify Settings > Payments
3. **Configure shipping** - Set up in Shopify Settings > Shipping
4. **Test checkout flow** - Make a test purchase to ensure everything works

## Support

For Shopify-specific issues, refer to:
- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify Community Forums](https://community.shopify.com/)
