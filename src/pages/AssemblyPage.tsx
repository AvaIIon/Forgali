import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";
import type { MessageKey } from "@/i18n/messages";
import { Users, Drill, LayoutGrid, BookOpen, Clock } from "lucide-react";

// Copy lives in src/i18n/messages.ts under assembly.tipN*.
const tips: Array<{ icon: typeof Users; title: MessageKey; text: MessageKey }> = [
  { icon: Users, title: "assembly.tip1Title", text: "assembly.tip1Text" },
  { icon: Drill, title: "assembly.tip2Title", text: "assembly.tip2Text" },
  { icon: LayoutGrid, title: "assembly.tip3Title", text: "assembly.tip3Text" },
  { icon: BookOpen, title: "assembly.tip4Title", text: "assembly.tip4Text" },
  { icon: Clock, title: "assembly.tip5Title", text: "assembly.tip5Text" },
];

const AssemblyPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/assembly")}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("assembly.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("assembly.lead")}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-brand-tint rounded-lg p-6">
                <Icon className="w-8 h-8 text-brand mb-4" />
                <h3 className="font-bold text-lg mb-2">{t(title)}</h3>
                <p className="text-muted-foreground text-sm">{t(text)}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("assembly.instructionsTitle")}</h2>
            <p className="text-muted-foreground mb-3">
              {t("assembly.instructions1")}{" "}
              <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>{" "}
              {t("assembly.instructions2")}
            </p>
            <p className="text-muted-foreground">
              {t("assembly.missing1")}{" "}
              <Link to="/returns" className="text-brand-accent hover:underline">{t("assembly.returnsLink")}</Link>{t("assembly.missing2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("assembly.safeTitle")}</h2>
            <p className="text-muted-foreground">
              {t("assembly.safe1")} <Link to="/safety-standards" className="text-brand-accent hover:underline">{t("footer.safetyStandards")}</Link>{t("assembly.safe2")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssemblyPage;
