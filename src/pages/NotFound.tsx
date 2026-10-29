import { Link, useLocation } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo title={t("notFound.seoTitle")} path={location.pathname} noindex />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          {t("notFound.body")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild>
            {/* client-side nav (not a full reload) so the SPA state survives */}
            <Link to="/">{t("notFound.home")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/category/dining">{t("common.shopDining")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/category/bedroom">{t("common.shopBedroom")}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
