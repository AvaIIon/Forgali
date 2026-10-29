import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

const ReturnsPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/returns")}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("returns.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("returns.lead")}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("returns.changesTitle")}</h2>
            <p className="text-muted-foreground mb-3">
              {t("returns.changes1a")}
              <strong>{t("returns.changes1b")}</strong>{t("returns.changes1c")}
            </p>
            <p className="text-muted-foreground">
              {t("returns.changes2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("returns.thirtyTitle")}</h2>
            <p className="text-muted-foreground mb-3">
              {t("returns.thirty1a")}<strong>{t("returns.thirtyStrong1")}</strong>{t("returns.thirty1b")}<strong>{t("returns.thirtyStrong2")}</strong>{t("returns.thirty1c")}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-3">
              <li>
                {t("returns.step1a")} <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>{t("returns.step1b")}
              </li>
              <li>
                {t("returns.step2")}
              </li>
              <li>
                {t("returns.step3")}
              </li>
            </ol>
            <p className="text-muted-foreground">
              {t("returns.refund")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("returns.damagedTitle")}</h2>
            <p className="text-muted-foreground">
              {t("returns.damaged1")}<strong>{t("returns.damagedStrong")}</strong>{t("returns.damaged2")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("returns.missingTitle")}</h2>
            <p className="text-muted-foreground">
              {t("returns.missingBody")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{t("returns.contactTitle")}</h2>
            <p className="text-muted-foreground">
              {t("returns.contact1")} <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>{t("returns.contact2")}{" "}
              <Link to="/shipping" className="text-brand-accent hover:underline">{t("returns.shippingLink")}</Link>{t("returns.and")}{" "}
              <Link to="/warranty" className="text-brand-accent hover:underline">{t("returns.warrantyLink")}</Link>{t("returns.pages")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReturnsPage;
