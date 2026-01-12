import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SleepSolutions } from "@/components/SleepSolutions";
import { TestimonialSection } from "@/components/TestimonialSection";
import { BedsSection } from "@/components/BedsSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SleepSolutions />
        <TestimonialSection />
        <BedsSection />
        <ProductGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;