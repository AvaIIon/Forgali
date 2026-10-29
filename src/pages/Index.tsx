import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { ShopTheLook } from "@/components/ShopTheLook";
import { PromoBanner } from "@/components/PromoBanner";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { EmailCaptureBand } from "@/components/EmailCaptureBand";
import { Seo } from "@/components/Seo";
import { useLocale } from "@/i18n/LocaleContext";

const Index = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <GuaranteeStrip />
        <FeaturedCategories />
        <ShopTheLook />
        {/* Brand block separates the two full-bleed image sections and tells
            the "why solid wood / priced fair" story before the hard sell */}
        <BrandStatement />
        <PromoBanner />
        <ProductGrid />
        <EmailCaptureBand />
      </main>
      <Footer />
    </div>
  );
};

export default Index;