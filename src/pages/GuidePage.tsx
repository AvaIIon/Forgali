import { useMemo } from "react";
import { Link, useParams } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  GUIDES,
  GUIDE_PICKS_MAX,
  GUIDE_PICKS_PER_VIEW,
  getGuide,
  guideJsonLd,
  guideShopViews,
  relatedLinks,
} from "@/lib/guides";
import { productMatchesSubcategory } from "@/lib/subcategories";
import type { ConvertedProduct } from "@/services/shopifyService";
import NotFound from "./NotFound";

// One buying guide. All copy comes from src/lib/guides.ts; middleware.ts
// renders the same data into the initial HTML, so keep this markup's text
// content identical to what guideBody() emits (headings, paragraphs, FAQs).
const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLocale();
  const guide = getGuide(slug);
  // Pieces for "Shop the pieces in this guide": the same rule as guidePicks()
  // in middleware.ts, over the live catalogue sorted available-first like the
  // category grids. Hooks run before the not-found return.
  const { products } = useShopifyProducts();
  const picks = useMemo(() => {
    if (!guide) return [];
    const sorted = [...products].sort(
      (a, b) => Number(b.availableForSale) - Number(a.availableForSale)
    );
    const out: ConvertedProduct[] = [];
    for (const v of guideShopViews(guide)) {
      let n = 0;
      for (const p of sorted) {
        if (n >= GUIDE_PICKS_PER_VIEW) break;
        if (p.category !== v.category || out.includes(p) || !productMatchesSubcategory(p, v.subcategory)) continue;
        out.push(p);
        n++;
        if (out.length >= GUIDE_PICKS_MAX) return out;
      }
    }
    return out;
  }, [products, guide]);
  if (!guide) return <NotFound />;

  const shop = relatedLinks(guide);
  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={guide.title}
        description={guide.description}
        path={`/guides/${guide.slug}`}
        jsonLd={guideJsonLd(guide)}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:underline">Forgali</Link>
            {" / "}
            <Link to="/guides" className="hover:underline">{t("footer.buyingGuides")}</Link>
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{guide.h1}</h1>
          <p className="text-muted-foreground text-base md:text-lg">{guide.lead}</p>
        </div>
      </div>

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {guide.sections.map((section) => (
            <section key={section.h2} className="mb-10">
              <h2 className="text-2xl font-bold mb-3 text-brand">{section.h2}</h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {para}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.links?.length ? (
                <p className="flex flex-wrap gap-x-4 gap-y-1">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-brand-accent underline hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </section>
          ))}

          {guide.faqs.length ? (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-brand">{t("common.faq")}</h2>
              {guide.faqs.map((faq) => (
                <div key={faq.q} className="mb-5 last:mb-0">
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </section>
          ) : null}

          {shop.length ? (
            <section className="mb-10 bg-brand-tint rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3">{t("guide.shopPieces")}</h2>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                {shop.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-brand-accent underline hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
              {picks.length ? (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {picks.map((p) => (
                    <CategoryProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : null}
              <p className="text-sm text-muted-foreground mt-3">
                {t("guide.trust")}
              </p>
            </section>
          ) : null}

          {others.length ? (
            <section>
              <h2 className="text-xl font-bold mb-3">{t("guide.more")}</h2>
              <ul className="space-y-2">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/guides/${g.slug}`} className="text-brand-accent underline hover:text-foreground">
                      {g.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="text-xs text-muted-foreground mt-10">{t("guide.lastUpdated", { date: guide.updated })}</p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default GuidePage;
