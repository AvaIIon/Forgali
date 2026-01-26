import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TestimonialSection } from "@/components/TestimonialSection";
import { BedsSection } from "@/components/BedsSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { PromoBanner } from "@/components/PromoBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
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