import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHeader } from "@/components/CategoryHeader";
import { CategoryFilters } from "@/components/CategoryFilters";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { SubcategoryTabs } from "@/components/SubcategoryTabs";
import { useShopifyProductsByCategory } from "@/hooks/useShopifyProducts";
import { ProductCategory } from "@/services/shopifyService";

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
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  // Validate category
  const validCategory = (category as ProductCategory) || "bunk-beds";
  const categoryInfo = categoryInfoMap[validCategory] || categoryInfoMap["bunk-beds"];
  
  // Fetch products from Shopify
  const { products: allCategoryProducts, loading, error } = useShopifyProductsByCategory(validCategory);
  
  // Filter by subcategory if provided
  const products = useMemo(() => {
    if (!subcategory) return allCategoryProducts;
    return allCategoryProducts.filter(p => 
      p.subcategory === subcategory || 
      p.subcategory.includes(subcategory)
    );
  }, [allCategoryProducts, subcategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryHeader title={categoryInfo.title} description={categoryInfo.description} />
      <SubcategoryTabs />
      <CategoryFilters />
      
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
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
