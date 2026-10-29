import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";
import { Truck, PackageSearch, Users, ClipboardCheck } from "lucide-react";

const ShippingPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/shipping")}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("shipping.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("shipping.lead")}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-brand-tint rounded-lg p-6">
              <Truck className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("common.freeShipping")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("shipping.card1Body")}
              </p>
            </div>
            <div className="bg-brand-tint rounded-lg p-6">
              <PackageSearch className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("shipping.card2Title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("shipping.card2Body")}
              </p>
            </div>
            <div className="bg-brand-tint rounded-lg p-6">
              <ClipboardCheck className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("shipping.card3Title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("shipping.card3Body")}
              </p>
            </div>
            <div className="bg-brand-tint rounded-lg p-6">
              <Users className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("shipping.card4Title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("shipping.card4Body")}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("shipping.timesTitle")}</h2>
            <p className="text-muted-foreground mb-3">
              {t("shipping.times1")}
            </p>
            <p className="text-muted-foreground mb-3">
              {t("shipping.times2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("shipping.questionsTitle")}</h2>
            <p className="text-muted-foreground">
              {t("shipping.questions1")} <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>{t("shipping.questions2")}{" "}
              <Link to="/returns" className="text-brand-accent hover:underline">{t("shipping.returnsPolicyLink")}</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPage;
