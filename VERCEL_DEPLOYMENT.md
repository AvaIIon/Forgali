# Vercel Deployment Guide - Fixing 401 Shopify Errors

## Common Issue: 401 Unauthorized Error

If you're seeing `401` errors when trying to checkout, it means your Shopify credentials aren't configured correctly in Vercel.

## Step-by-Step Fix

### 1. Verify Your Shopify Credentials

Make sure you have:
- **Store Domain**: `kjrq9s-yp.myshopify.com`
- **Storefront Access Token**: `8fd74f31580d531ab2ef3aa832c11d2b`

### 2. Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** (top navigation)
3. Click on **Environment Variables** (left sidebar)
4. Add these two variables:

   **Variable 1:**
   - **Name**: `VITE_SHOPIFY_STORE_DOMAIN`
   - **Value**: `kjrq9s-yp.myshopify.com`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Name**: `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - **Value**: `8fd74f31580d531ab2ef3aa832c11d2b`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save**

### 3. Redeploy Your Application

**Important**: After adding environment variables, you MUST redeploy:

1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) menu on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

### 4. Verify the Fix

After redeployment:
1. Visit your live site
2. Add a product to cart
3. Go to checkout
4. Click "Checkout with Shopify"
5. It should redirect to Shopify checkout (no 401 error)

## Troubleshooting

### Still Getting 401 Errors?

1. **Check Environment Variables Are Set**
   - In Vercel, go to Settings → Environment Variables
   - Verify both variables exist and are spelled correctly
   - Make sure they're enabled for Production environment

2. **Verify Token is Correct**
   - Go to Shopify Admin → Settings → Apps and sales channels
   - Click "Develop apps" → Your app → "API credentials"
   - Check the Storefront API access token matches

3. **Check Token Scopes**
   - In Shopify Admin → Your app → Configuration → Storefront API
   - Ensure these scopes are enabled:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_write_checkouts`
     - ✅ `unauthenticated_read_checkouts`

4. **Verify Store Domain Format**
   - Should be: `your-store.myshopify.com` (no `https://`)
   - Should NOT be: `https://your-store.myshopify.com`
   - Should NOT be: `your-store.com`

5. **Check Browser Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - The improved error handling will show specific issues

### Common Mistakes

❌ **Wrong**: `VITE_SHOPIFY_STORE_DOMAIN=https://kjrq9s-yp.myshopify.com`
✅ **Correct**: `VITE_SHOPIFY_STORE_DOMAIN=kjrq9s-yp.myshopify.com`

❌ **Wrong**: Token has spaces or extra characters
✅ **Correct**: Token is exactly as copied from Shopify

❌ **Wrong**: Only set for Development environment
✅ **Correct**: Set for Production, Preview, AND Development

❌ **Wrong**: Forgot to redeploy after adding variables
✅ **Correct**: Always redeploy after changing environment variables

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify your Shopify app is installed and active
3. Try regenerating your Storefront API token
4. Make sure your Shopify store is active (not paused)
