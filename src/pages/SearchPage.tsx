import { Link, useSearchParams } from "react-router-dom";
import { Loader2, SearchX } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { useShopifyProductSearch } from "@/hooks/useShopifyProducts";
import { Seo } from "@/components/Seo";

const POPULAR_CATEGORIES = [
  { label: "Bunk Beds", href: "/category/bunk-beds" },
  { label: "Loft Beds", href: "/category/loft-beds" },
  { label: "Dining", href: "/category/dining" },
  { label: "Living", href: "/category/living" },
  { label: "Smart Deals", href: "/smart-deals" },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { results, loading, error } = useShopifyProductSearch(query);

  return (
    <div className="min-h-screen bg-background">
      {/* Search results are per-query permutations — never index them. */}
      <Seo title={query ? `Search: ${query} | Forgali` : "Search | Forgali"} path="/search" noindex />
      <Header />

      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {query ? (
              <>
                Search results for <span className="text-primary">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Search"
            )}
          </h1>
          {!loading && query && (
            <p className="text-muted-foreground mb-8">
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#4A647C]" />
              <p className="text-muted-foreground">Searching...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg mb-2">Error loading products</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && query && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map(product => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && !error && (!query || results.length === 0) && (
            <div className="flex flex-col items-center text-center py-16 gap-4">
              <SearchX className="w-10 h-10 text-muted-foreground" />
              <p className="text-lg text-foreground">
                {query ? "No products matched your search." : "Type in the search box above to find products."}
              </p>
              <p className="text-muted-foreground">Try a different word, or browse a category:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_CATEGORIES.map(cat => (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-[#4A647C] hover:text-[#4A647C] transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchPage;
