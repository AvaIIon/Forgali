import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

const WarrantyPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/warranty")}
      />
      <Header />
      
      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("warranty.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("warranty.lead")}
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{t("warranty.limited")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("warranty.body")}
            </p>
            
            <h3 className="text-xl font-bold mb-3 mt-6">{t("warranty.covered")}</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>{t("warranty.covered1")}</li>
              <li>{t("warranty.covered2")}</li>
              <li>{t("warranty.covered3")}</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3 mt-6">{t("warranty.notCovered")}</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>{t("warranty.notCovered1")}</li>
              <li>{t("warranty.notCovered2")}</li>
              <li>{t("warranty.notCovered3")}</li>
              <li>{t("warranty.notCovered4")}</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3 mt-6">{t("warranty.claim")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("warranty.claimBody")}
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WarrantyPage;
