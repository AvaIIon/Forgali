import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHeader } from "@/components/CategoryHeader";
import { CategoryFilters, SortOption, FilterState } from "@/components/CategoryFilters";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { SubcategoryTabs } from "@/components/SubcategoryTabs";
import { useShopifyProductsByCategory } from "@/hooks/useShopifyProducts";
import { ProductCategory, ConvertedProduct } from "@/services/shopifyService";

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

// Subcategory to tag matching patterns
const subcategoryTagPatterns: Record<string, string[]> = {
  // Bunk beds
  'twin-over-twin': ['twin over twin', 'twin over twin bunk'],
  'twin-over-full': ['twin over full'],
  'full-over-full': ['full over full'],
  'twin-xl-over-queen': ['twin xl over queen'],
  'l-shaped': ['l-shaped', 'corner loft bunk'],
  'multi-bunk': ['trio', 'quad', 'triple'],
  'low-bunk': ['low bunk'],
  'with-slide': ['slide', 'with slide', 'bunk bed with slide'],
  'with-stairs': ['stairs', 'with stairs', 'bunk bed with stairs'],
  // Loft beds  
  'low-loft': ['low loft'],
  'mid-loft': ['mid loft'],
  'high-loft': ['high loft', 'ultra high'],
  'loft-with-desk': ['desk', 'all in one'],
  'loft-with-slide': ['slide', 'play bed'],
  'corner-loft': ['corner loft'],
  // Single beds
  'platform': ['platform'],
  'house-bed': ['castle', 'house'],
  'floor-bed': ['toddler', 'floor'],
  'traditional': ['traditional'],
  'trundle-bed': ['trundle'],
  // Accessories
  'storage': ['dresser', 'storage', 'drawer'],
  'desks': ['desk'],
  'bookcases-shelves': ['bookcase', 'shelf'],
  'nightstands': ['nightstand', 'night stand'],
};

// Check if product matches a subcategory based on tags
const productMatchesSubcategory = (product: ConvertedProduct, subcategory: string): boolean => {
  const patterns = subcategoryTagPatterns[subcategory];
  if (!patterns) return product.subcategory === subcategory;
  
  const productTagsLower = product.tags.map(t => t.toLowerCase());
  const productTagStr = productTagsLower.join(' ');
  
  return patterns.some(pattern => 
    productTagsLower.some(tag => tag.includes(pattern)) ||
    productTagStr.includes(pattern)
  );
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  // Filter and sort state
  const [sortBy, setSortBy] = useState<SortOption>('best-selling');
  const [filters, setFilters] = useState<FilterState>({});
  
  // Validate category
  const validCategory = (category as ProductCategory) || "bunk-beds";
  const categoryInfo = categoryInfoMap[validCategory] || categoryInfoMap["bunk-beds"];
  
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
    
    // Filter by bed size
    if (filters.bedSize) {
      const sizeLower = filters.bedSize.toLowerCase();
      result = result.filter(p => 
        p.tags.some(t => t.toLowerCase().includes(sizeLower)) ||
        p.name.toLowerCase().includes(sizeLower)
      );
    }
    
    return result;
  }, [allCategoryProducts, subcategory, filters]);
  
  // Sort products
  const products = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'highest-rated':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.reverse();
      case 'best-selling':
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryHeader title={categoryInfo.title} description={categoryInfo.description} />
      <SubcategoryTabs />
      <CategoryFilters 
        filters={filters} 
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        products={allCategoryProducts}
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
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
