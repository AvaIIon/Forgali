import { useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHeader } from "@/components/CategoryHeader";
import { CategoryFilters } from "@/components/CategoryFilters";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { SubcategoryTabs } from "@/components/SubcategoryTabs";
import { getProductsByCategory, getProductsBySubcategory, getCategoryInfo } from "@/data/products";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  const categoryInfo = getCategoryInfo(category || "");
  
  // Get products filtered by subcategory if provided
  const products = subcategory 
    ? getProductsBySubcategory(category || "", subcategory)
    : getProductsByCategory(category || "");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryHeader title={categoryInfo.title} description={categoryInfo.description} />
      <SubcategoryTabs />
      <CategoryFilters />
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
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
