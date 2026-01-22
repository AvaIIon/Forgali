import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Forgali
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Crafting quality solid wood beds for families across Canada.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Forgali was founded with a simple mission: to create beautiful, durable, and safe solid wood beds that families can trust. 
              We believe that every child deserves a quality bed that will last through years of play, rest, and growth.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are committed to using only the finest materials and craftsmanship. Every bed is designed with safety, durability, 
              and style in mind. Our products meet or exceed all Canadian safety standards, and we stand behind every piece we create.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Why Choose Forgali</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Premium solid wood construction built to last</li>
              <li>Non-toxic, child-safe finishes</li>
              <li>Free Canada-wide shipping</li>
              <li>Comprehensive warranty coverage</li>
              <li>Expert customer support</li>
              <li>Sustainable and responsibly sourced materials</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
