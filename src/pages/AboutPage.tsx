import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About Forgali – Solid Wood Furniture for Every Room"
        description="Learn about Forgali — a Canadian store for solid wood kids' beds, dining, and living furniture built to last. Free Canada-wide shipping."
        path="/about"
      />
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Forgali
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Bringing quality solid wood furniture to families across Canada.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Forgali was founded with a simple mission: to bring beautiful, durable, and safe solid wood furniture
              to families across Canada. We believe every home deserves quality pieces that last through years of
              everyday life.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We carefully select solid wood furniture built for durability, safety, and style. The children's beds
              we carry are manufactured and tested to applicable children's furniture safety standards, and we stand
              behind every piece we sell.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Why Choose Forgali</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Solid wood construction built to last</li>
              <li>Durable, low-VOC finishes</li>
              <li>Free Canada-wide shipping</li>
              <li>Warranty coverage on manufacturing defects</li>
              <li>Responsive Canadian customer support</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
