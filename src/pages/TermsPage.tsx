import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

// Baseline terms of service. Daniel should have this reviewed and updated with
// the registered business name and governing jurisdiction before relying on it.
const TermsPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/terms")}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("terms.title")}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("terms.lead")}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("terms.ordersTitle")}</h2>
            <p>
              {t("terms.ordersBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("terms.pricingTitle")}</h2>
            <p>
              {t("terms.pricingBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("terms.shippingTitle")}</h2>
            <p>
              {t("terms.shippingBody1")}{" "}
              <Link to="/shipping" className="text-brand-accent hover:underline">{t("terms.shippingLink")}</Link>,{" "}
              <Link to="/returns" className="text-brand-accent hover:underline">{t("terms.returnsLink")}</Link>{t("terms.and")}{" "}
              <Link to="/warranty" className="text-brand-accent hover:underline">{t("terms.warrantyLink")}</Link>{t("terms.shippingBody2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("terms.useTitle")}</h2>
            <p>
              {t("terms.useBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("terms.contactTitle")}</h2>
            <p>
              {t("terms.contactBody")}{" "}
              <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>.
              {" "}{t("terms.seeAlso")} <Link to="/privacy" className="text-brand-accent hover:underline">{t("footer.privacy")}</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
