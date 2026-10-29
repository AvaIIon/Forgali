import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { cdnImage, cdnSrcSet } from "@/lib/imageProxy";

const BRAND_IMG =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600425900-014__1_25f566d3-2d94-4b5f-a5dc-1a1fe4172f1b.jpg?v=1783608426";

// Brand-statement block — replaces the old bed-only "Why Choose Forgali?"
// value-prop cards. The four trust icons already live in GuaranteeStrip near
// the top of the page, so this block is copy + image only to avoid repeating
// them.
export const BrandStatement = () => {
  const { t } = useLocale();
  return (
    <section className="py-16 px-4 bg-brand-tint/60">
      <div className="max-w-rail mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-3xl font-bold">{t("brand.title")}</h2>
          <p className="mx-auto mb-6 max-w-xl leading-relaxed text-muted-foreground md:mx-0">
            {t("brand.body1")}<em>{t("brand.bodyEm")}</em>{t("brand.body2")}
          </p>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link to="/category/dining">
              <button className="rounded-full bg-brand px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
                {t("brand.cta")}
              </button>
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-brand-accent hover:underline">
              {t("brand.learnMore")}
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-tint">
          <img
            src={cdnImage(BRAND_IMG, 900)}
            srcSet={cdnSrcSet(BRAND_IMG, [600, 900, 1200])}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={t("brand.alt")}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
