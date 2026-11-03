import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import {
  HERO_DESKTOP as heroDining,
  HERO_MOBILE as heroDiningMobile,
  HERO_MOBILE_MEDIA,
} from "@/lib/heroImage";

export const Hero = () => {
  const { t } = useLocale();
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <picture>
        <source media={HERO_MOBILE_MEDIA} srcSet={heroDiningMobile} />
        <img
          src={heroDining}
          alt={t("hero.alt")}
          className="w-full h-full object-cover"
          // LCP image: hint the browser to fetch it first. Set via ref because
          // React 18 doesn't recognize the fetchPriority prop.
          ref={(el) => el?.setAttribute("fetchpriority", "high")}
        />
      </picture>
      {/* The nook photo is bright, so the text needs a stronger fade than a
          dark room would: one from the left for the text column and one from
          the bottom for the buttons and the full-width mobile layout. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-16 left-8 md:left-16 max-w-xl">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded mb-2">
          {t("hero.kicker")}
        </span>
        {/* The page's one H1. The homepage had none at all (every section
            title is an H2), so Google had no main heading to read. */}
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
          {t("hero.title")}
        </h1>
        <p className="text-white/90 text-base md:text-lg mb-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          {t("hero.lead")}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/category/dining"
            className="bg-foreground text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            {t("hero.ctaDining")}
          </Link>
          <Link
            to="/category/bedroom"
            className="bg-brand-tint text-foreground px-6 py-2.5 rounded-full text-sm font-medium border border-foreground hover:bg-brand-tint-hover transition-colors"
          >
            {t("hero.ctaBeds")}
          </Link>
        </div>
      </div>
    </section>
  );
};
