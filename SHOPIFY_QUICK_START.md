# Shopify Quick Start Guide - Step by Step

Follow these exact steps to connect your new Shopify store to your Forgali website.

## Part 1: Set Up Your Shopify Store (First Time Setup)

### Step 1: Complete Your Shopify Store Setup

1. **Log into your Shopify account** at [shopify.com/login](https://www.shopify.com/login)

2. **Complete the store setup wizard** if you see it:
   - Enter your store name (e.g., "Forgali")
   - Choose your country (Canada)
   - Click "Next" through the prompts

3. **Skip the "Add products" step for now** - we'll do that later

4. **You should now see your Shopify Admin Dashboard**

### Step 2: Get Your Store Domain

1. Look at the **top left corner** of your Shopify admin
2. You'll see something like: `your-store-name.myshopify.com`
3. **Write this down** - you'll need it later
   - Example: `forgali.myshopify.com` or `forgali-test.myshopify.com`

## Part 2: Get Your API Credentials

### Step 3: Enable Developer Mode (If Needed)

1. In your Shopify admin, look at the **bottom left corner**
2. If you see "Settings" - you're good, skip to Step 4
3. If you DON'T see "Settings", you need to enable developer mode:
   - Click on your **account name** (top right)
   - Look for "Developer mode" or "Enable developer preview"
   - Turn it ON

### Step 4: Create a Storefront API App

1. In Shopify admin, click **"Settings"** (bottom left, looks like a gear icon)

2. Click **"Apps and sales channels"** (in the left sidebar)

3. Click **"Develop apps"** button (top right, blue button)
   - If you don't see this button, you may need to enable developer mode (see Step 3)

4. Click **"Create an app"** button (top right)

5. **Name your app:**
   - Enter: `Forgali Storefront`
   - Click **"Create app"**

### Step 5: Configure Storefront API

1. You'll see a page with tabs: "Overview", "API credentials", "Configuration"
   
2. Click on **"Configuration"** tab

3. Scroll down to **"Storefront API"** section

4. Click **"Configure"** button next to "Storefront API"

5. You'll see a list of scopes. Enable these **3 scopes**:
   - ✅ Check the box for: `unauthenticated_read_product_listings`
   - ✅ Check the box for: `unauthenticated_write_checkouts`  
   - ✅ Check the box for: `unauthenticated_read_checkouts`

6. Click **"Save"** button (top right)

### Step 6: Install the App and Get Your Token

1. Go back to the **"Overview"** tab (at the top)

2. Click **"Install app"** button (top right, green button)

3. Click **"Install"** in the confirmation popup

4. After installation, you'll see **"API credentials"** section

5. Click on **"API credentials"** tab

6. Scroll down to **"Storefront API"** section

7. You'll see **"Storefront API access token"** - this is a long string of letters and numbers

8. **IMPORTANT:** Click the **"Reveal token"** or **"Show token"** button

9. **COPY THIS TOKEN** - Click the copy icon or select all and copy (Cmd+C on Mac, Ctrl+C on Windows)
   - ⚠️ **You can only see this once!** Save it somewhere safe
   - Example token looks like: `shpat_1234567890abcdef1234567890abcdef`

10. **Write down:**
    - Your store domain: `________________.myshopify.com`
    - Your access token: `shpat_________________________`

## Part 3: Connect to Your Website

### Step 7: Create Environment File

1. **Open your project folder** in your code editor (VS Code, etc.)

2. Look for a file called `.env.example` in the root folder

3. **Copy it** and create a new file called `.env`
   - On Mac/Linux: In terminal, run: `cp .env.example .env`
   - Or manually: Right-click `.env.example` → Copy → Rename to `.env`

4. **Open the `.env` file** in your editor

### Step 8: Add Your Shopify Credentials

1. In the `.env` file, you'll see:
   ```
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

2. **Replace the values:**
   - Replace `your-store.myshopify.com` with your actual store domain (from Step 2)
     - Example: `VITE_SHOPIFY_STORE_DOMAIN=forgali.myshopify.com`
   - Replace `your-storefront-access-token` with your token (from Step 6)
     - Example: `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_1234567890abcdef...`

3. **Save the file** (Cmd+S or Ctrl+S)

4. **Important:** Make sure there are NO spaces around the `=` sign
   - ✅ Correct: `VITE_SHOPIFY_STORE_DOMAIN=forgali.myshopify.com`
   - ❌ Wrong: `VITE_SHOPIFY_STORE_DOMAIN = forgali.myshopify.com`

### Step 9: Restart Your Development Server

1. **Stop your current server** if it's running:
   - In the terminal, press `Ctrl+C` (or `Cmd+C` on Mac)

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. The server should start on `http://localhost:8080`

### Step 10: Test the Connection

1. **Open your website** in the browser: `http://localhost:8080`

2. **Open the browser console** to check for errors:
   - Press `F12` (or `Cmd+Option+I` on Mac)
   - Click the "Console" tab

3. **Look for any errors:**
   - If you see "Shopify credentials not configured" → Check your `.env` file
   - If you see API errors → Check your token and store domain
   - If no errors → You're connected! ✅

## Part 4: Add Products to Shopify (Optional but Recommended)

### Step 11: Add Your First Product

1. In Shopify admin, click **"Products"** (left sidebar)

2. Click **"Add product"** button (top right)

3. **Fill in the product details:**
   - **Title:** Enter product name (e.g., "Max and Lily Twin Over Twin Bunk Bed")
   - **Description:** Add product description
   - **Media:** Click "Add media" to upload product images
   - **Pricing:** Enter the price
   - **Inventory:** Set quantity (or enable "Track quantity")

4. **Add Variants** (for different colors/finishes):
   - Scroll down to "Variants" section
   - Click "Add variant"
   - Set variant name (e.g., "White", "Natural", "Espresso")
   - Set price for each variant

5. Click **"Save"** (top right)

6. **Make sure the product is "Active"** (green toggle at top)

### Step 12: Test Adding to Cart

1. Go back to your website: `http://localhost:8080`

2. Try adding a product to cart

3. Go to checkout

4. If Shopify is configured, you should see "Checkout with Shopify" button

5. Click it - it should redirect to Shopify's checkout page

## Troubleshooting

### "Shopify credentials not configured" error
- ✅ Check that your `.env` file exists in the root folder
- ✅ Check that variable names start with `VITE_`
- ✅ Make sure you restarted the dev server after creating `.env`
- ✅ Check for typos in the store domain (no `https://`, just `store.myshopify.com`)

### "Invalid API key" or "401 Unauthorized" error
- ✅ Check that you copied the full token (it's very long)
- ✅ Make sure you're using the **Storefront API** token, not Admin API token
- ✅ Verify the token hasn't expired (create a new one if needed)

### Products not showing
- ✅ Make sure products are **published** in Shopify (not draft)
- ✅ Check that products have **variants** set up
- ✅ Verify your Storefront API scopes are enabled

### Can't find "Develop apps" button
- ✅ Make sure you're in the Shopify admin (not the storefront)
- ✅ Try enabling developer mode (see Step 3)
- ✅ Some Shopify plans may have different interfaces - look for "Settings" → "Apps"

## What's Next?

Once connected:
1. **Import your products** to Shopify (or add them manually)
2. **Set up payment methods** in Shopify Settings → Payments
3. **Configure shipping** in Shopify Settings → Shipping
4. **Test a complete purchase** to make sure everything works

## Need Help?

- **Shopify Help Center:** https://help.shopify.com
- **Shopify Community:** https://community.shopify.com
- **Check your `.env` file** - make sure it's in the root folder, not in `src/`

---

**Quick Checklist:**
- [ ] Shopify account created
- [ ] Store domain noted
- [ ] Storefront API app created
- [ ] API scopes enabled
- [ ] Access token copied
- [ ] `.env` file created
- [ ] Credentials added to `.env`
- [ ] Dev server restarted
- [ ] No errors in browser console
- [ ] Test checkout works
