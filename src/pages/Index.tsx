import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TestimonialSection } from "@/components/TestimonialSection";
import { BedsSection } from "@/components/BedsSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { ShopTheLook } from "@/components/ShopTheLook";
import { PromoBanner } from "@/components/PromoBanner";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Forgali — Solid Wood Furniture for Every Room"
        description="Solid wood furniture families trust — kids' bunk and loft beds, dining tables and chairs, and living-room pieces. Free Canada-wide shipping."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <GuaranteeStrip />
        <FeaturedCategories />
        <ShopTheLook />
        <PromoBanner />
        <TestimonialSection />
        <BedsSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;