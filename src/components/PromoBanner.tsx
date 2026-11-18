import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Button } from "@/components/ui/button";

// Black Friday 2026 (Nov 18–30): the band carries the in-stock / before-Christmas
// message with the risk-reversal (free shipping, 5-year warranty). No prices,
// no lead times and no counts in this copy by Daniel's rule. The previous
// "every dining piece is on sale" claim was true for only 55 of 86 dining
// products by Nov 16, so it should not come back as-is after the sale.
const BANNER_IMG =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2872mc1008-150__1.jpg";

export const PromoBanner = () => {
  const { t } = useLocale();
  return (
    <section className="relative h-[440px] md:h-[500px] overflow-hidden">
      <picture>
        {/* Square source for phones; server-side wide crop for desktop so we
            don't ship a 2000x2000 image into a 500px-tall strip */}
        <source media="(max-width: 767px)" srcSet={`${BANNER_IMG}?width=900`} />
        <img
          src={`${BANNER_IMG}?width=2400&height=1000&crop=center`}
          alt={t("promo.alt")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </picture>
      {/* Warm walnut gradient (not black) keeps the sunlit room vibrant while
          carrying white text on the left. The accents below are house brass, not
          amber: the pill takes it at full strength, the headline word and the CTA
          take the light step, because brass itself only manages 2.3:1 here. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#33210f]/85 via-[#33210f]/45 to-transparent" />
      <div className="relative h-full max-w-rail mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
          <span className="text-sm font-semibold uppercase tracking-wider text-white bg-brand-accent px-3 py-1 rounded-full [text-shadow:none]">
            {t("promo.kicker")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            <span className="text-brand-accent-light">{t("promo.titleEm")}</span>{t("promo.titleRest")}
          </h2>
          <p className="text-lg mt-4 text-white/90">
            {t("promo.body")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-brand-accent-light text-brand font-semibold hover:bg-brand-accent-light-hover"
            >
              <Link to="/category/dining">{t("promo.cta")}</Link>
            </Button>
            <Link
              to="/category/bedroom"
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-brand-accent-light"
            >
              {t("promo.browse")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
