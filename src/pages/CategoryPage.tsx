import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { CategoryHeader } from "@/components/CategoryHeader";
import { CategoryFilters, SortOption, FilterState } from "@/components/CategoryFilters";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { SubcategoryTabs } from "@/components/SubcategoryTabs";
import { useShopifyProductsByCategory } from "@/hooks/useShopifyProducts";
import { ProductCategory } from "@/services/shopifyService";
import { productMatchesSubcategory } from "@/lib/subcategories";
import { getBedSeo } from "@/lib/categorySeo";

// Category info for headers
const categoryInfoMap: Record<string, { title: string; description: string }> = {
  "bunk-beds": {
    title: "Bunk Beds",
    description: "Premium solid wood bunk beds built to last. From twin over twin to quad bunks, find the perfect space-saving solution for your family."
  },
  "loft-beds": {
    title: "Loft Beds",
    description: "Maximize your space with our sturdy loft beds. Perfect for bedrooms, dorms, or any space that needs smart vertical storage."
  },
  "single-beds": {
    title: "Single Beds",
    description: "Classic single beds in timeless designs in twin, full, and queen sizes. Solid wood construction for lasting quality."
  },
  "mattresses": {
    title: "Mattresses",
    description: "Premium mattresses designed for comfort and support. Find the perfect fit for your bunk bed, loft bed, or single bed."
  },
  "accessories": {
    title: "Storage & Accessories",
    description: "Complete your room with our storage solutions and accessories. Dressers, shelving, and more."
  },
  "bedroom": {
    title: "Bedroom",
    description: "Solid wood beds for every sleeper — bunk beds, loft beds, and single beds built to last from childhood through the teenage years."
  },
  "dining": {
    title: "Dining",
    description: "Solid wood dining tables, chairs, benches, and complete sets. Timeless craftsmanship for the heart of your home."
  },
  "living": {
    title: "Living",
    description: "Coffee tables, console and side tables, sideboards, TV stands, and shelving — solid wood pieces that bring warmth to every living space."
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');

  // Filter and sort state
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({});

  // Unknown categories must 404, not impersonate Bunk Beds — the old fallback
  // gave every /category/<junk> URL a 200 with a self-canonical, an
  // unbounded indexable duplicate surface.
  const categoryInfo = category ? categoryInfoMap[category] : undefined;
  const validCategory = category as ProductCategory;
  
  // Fetch products from Shopify
  const { products: allCategoryProducts, loading, error } = useShopifyProductsByCategory(validCategory);
  
  // Filter by subcategory and other filters
  const filteredProducts = useMemo(() => {
    let result = allCategoryProducts;
    
    // Filter by subcategory using tag matching
    if (subcategory) {
      result = result.filter(p => productMatchesSubcategory(p, subcategory));
    }
    
    // Filter by price range
    if (filters.priceRange) {
      result = result.filter(p => {
        switch (filters.priceRange) {
          case 'under-500': return p.price < 500;
          case '500-1000': return p.price >= 500 && p.price < 1000;
          case '1000-2000': return p.price >= 1000 && p.price < 2000;
          case 'over-2000': return p.price >= 2000;
          default: return true;
        }
      });
    }
    
    // Filter by finish
    if (filters.finish) {
      result = result.filter(p => 
        p.finishes.some(f => f.toLowerCase() === filters.finish?.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase() === filters.finish?.toLowerCase())
      );
    }
    
    // Filter by bed size. "Twin" must not substring-match "Twin XL" —
    // word-boundary check with an XL exclusion.
    if (filters.bedSize) {
      const sizeLower = filters.bedSize.toLowerCase();
      const sizeMatches = (text: string) => {
        if (sizeLower === 'twin') return /\btwin\b(?!\s*xl)/.test(text);
        return text.includes(sizeLower);
      };
      result = result.filter(p =>
        p.tags.some(t => sizeMatches(t.toLowerCase())) ||
        sizeMatches(p.name.toLowerCase())
      );
    }

    return result;
  }, [allCategoryProducts, subcategory, filters]);

  // Sort products. "Highest Rated" (fabricated ratings) and "Newest" (was
  // just reversed API order, not recency) are gone.
  const products = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        break;
    }
    // Always push out-of-stock products to the end, preserving the chosen order
    // within the in-stock and out-of-stock groups (Array.sort is stable).
    sorted.sort((a, b) =>
      a.availableForSale === b.availableForSale ? 0 : a.availableForSale ? -1 : 1
    );
    return sorted;
  }, [filteredProducts, sortBy]);

  // Unknown category → real 404 content with noindex (after all hooks).
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Category Not Found | Forgali"
          description="This category could not be found."
          path={`/category/${category ?? ""}`}
          noindex
        />
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold">We couldn't find that category</h1>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/category/dining" className="text-[#4A647C] hover:underline">Dining</Link>
            <Link to="/category/living" className="text-[#4A647C] hover:underline">Living</Link>
            <Link to="/category/bedroom" className="text-[#4A647C] hover:underline">Bedroom</Link>
            <Link to="/category/accessories" className="text-[#4A647C] hover:underline">Storage &amp; Accessories</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Rich per-page SEO (targets the exact Search Console queries) with a
  // graceful fall back to the generic category info. Subcategory views get
  // their OWN title/H1/copy + a self-canonical URL so "low loft bed",
  // "mid loft bed", "high loft beds" etc. each rank on their own term.
  const bedSeo = getBedSeo(validCategory, subcategory);
  const seoTitle = bedSeo?.seoTitle ?? `${categoryInfo.title} | Forgali`;
  const seoDescription = bedSeo?.seoDescription ?? categoryInfo.description;
  const headerH1 = bedSeo?.h1 ?? categoryInfo.title;
  const headerLead = bedSeo?.lead ?? categoryInfo.description;
  // Self-canonical ONLY when this subcategory has its own dedicated SEO (rich
  // title/copy). A subcategory view without dedicated SEO is a near-duplicate
  // of the parent (same generic title), so it canonicals to the parent to
  // avoid indexable duplicate pages.
  const seoPath = subcategory && bedSeo
    ? `/category/${validCategory}?subcategory=${subcategory}`
    : `/category/${validCategory}`;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
      />
      <Header />
      <CategoryHeader title={headerH1} description={headerLead} />
      {/* The brand hub had exactly one inbound link sitewide (the footer), so
          it could never accumulate signal from its own two best children. */}
      {(validCategory === "dining" || validCategory === "living") && (
        <div className="max-w-7xl mx-auto px-4 -mt-2 mb-2 text-sm text-muted-foreground">
          Part of our{" "}
          <Link to="/plank-and-beam" className="underline hover:text-foreground">
            Plank &amp; Beam collection in Canada
          </Link>
          .
        </div>
      )}
      <SubcategoryTabs products={allCategoryProducts} />
      <CategoryFilters
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        products={allCategoryProducts}
        category={validCategory}
      />
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#4A647C]" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          )}
          
          {/* Error state */}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg mb-2">Error loading products</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}
          
          {/* Products grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Buying-guide copy below the grid (keeps the product grid above the
          fold while giving the page real, indexable content for its term) */}
      {bedSeo?.intro && (
        <section className="border-t border-border bg-secondary/20 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#3D5A6C]">
              About {headerH1}
            </h2>
            {bedSeo.intro.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CategoryPage;
