import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, CheckCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

const SafetyStandardsPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/safety-standards")}
      />
      <Header />
      
      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("safety.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("safety.lead")}
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-background border border-border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-brand" />
              <h2 className="text-2xl font-bold">{t("safety.certTitle")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t("safety.certBody")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("safety.hcTitle")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("safety.hcBody")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("safety.vocTitle")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("safety.vocBody")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("safety.structTitle")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("safety.structBody")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("safety.guardTitle")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("safety.guardBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-tint rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">{t("safety.tipsTitle")}</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t("safety.tip1")}</li>
              <li>{t("safety.tip2")}</li>
              <li>{t("safety.tip3")}</li>
              <li>{t("safety.tip4")}</li>
              <li>{t("safety.tip5")}</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SafetyStandardsPage;
