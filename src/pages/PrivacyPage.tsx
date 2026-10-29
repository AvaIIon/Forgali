import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

// Baseline privacy policy covering what the storefront actually does: order
// processing via Shopify's hosted checkout and optional email marketing
// sign-up. Daniel should have this reviewed against PIPEDA/CASL and updated
// with the registered business name/address before relying on it.
const PrivacyPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/privacy")}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("privacy.title")}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("privacy.lead")}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("privacy.collectTitle")}</h2>
            <p className="mb-3">
              {t("privacy.collect1")}
            </p>
            <p>
              {t("privacy.collect2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("privacy.useTitle")}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t("privacy.use1")}</li>
              <li>{t("privacy.use2")}</li>
              <li>{t("privacy.use3")}</li>
              <li>{t("privacy.use4")}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("privacy.sharingTitle")}</h2>
            <p>
              {t("privacy.sharingBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("privacy.choicesTitle")}</h2>
            <p>
              {t("privacy.choicesBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t("privacy.contactTitle")}</h2>
            <p>
              {t("privacy.contactBody")}{" "}
              <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>.
              {" "}{t("terms.seeAlso")} <Link to="/terms" className="text-brand-accent hover:underline">{t("footer.terms")}</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
