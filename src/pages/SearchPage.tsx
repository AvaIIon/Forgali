import { Link, useSearchParams } from "@/i18n/router";
import { Loader2, SearchX } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { useShopifyProductSearch } from "@/hooks/useShopifyProducts";
import { Seo } from "@/components/Seo";
import { useLocale } from "@/i18n/LocaleContext";
import type { MessageKey } from "@/i18n/messages";

const POPULAR_CATEGORIES: Array<{ label: MessageKey; href: string }> = [
  { label: "nav.bunkBeds", href: "/category/bunk-beds" },
  { label: "nav.loftBeds", href: "/category/loft-beds" },
  { label: "nav.dining", href: "/category/dining" },
  { label: "nav.living", href: "/category/living" },
  { label: "nav.smartDeals", href: "/smart-deals" },
];

const SearchPage = () => {
  const { t } = useLocale();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { results, loading, error } = useShopifyProductSearch(query);

  return (
    <div className="min-h-screen bg-background">
      {/* Search results are per-query permutations — never index them. */}
      <Seo title={query ? t("search.seoTitleQuery", { query }) : t("search.seoTitle")} path="/search" noindex />
      <Header />

      <section className="py-10 px-4">
        <div className="max-w-rail mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {query ? (
              <>
                {t("search.resultsFor")}<span className="text-brand-accent">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              t("search.title")
            )}
          </h1>
          {!loading && query && (
            <p className="text-muted-foreground mb-8">
              {t(results.length === 1 ? "search.foundOne" : "search.foundMany", { count: results.length })}
            </p>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
              <p className="text-muted-foreground">{t("search.searching")}</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg mb-2">{t("common.loadingError")}</p>
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
                {query ? t("search.noMatch") : t("search.typeAbove")}
              </p>
              <p className="text-muted-foreground">{t("search.tryOther")}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_CATEGORIES.map(cat => (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-brand-accent hover:text-brand-accent transition-colors"
                  >
                    {t(cat.label)}
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
