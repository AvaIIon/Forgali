import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const WarrantyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Warranty Information
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Your investment is protected with our comprehensive warranty coverage.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Limited Warranty</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Forgali warrants that all products are free from defects in materials and workmanship under normal use for a period 
              of 5 years from the date of purchase. This warranty covers structural defects and manufacturing flaws.
            </p>
            
            <h3 className="text-xl font-bold mb-3 mt-6">What's Covered</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Structural defects in solid wood components</li>
              <li>Manufacturing defects in hardware and assembly</li>
              <li>Premature wear of finish under normal use</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3 mt-6">What's Not Covered</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Damage from misuse, abuse, or accidents</li>
              <li>Normal wear and tear</li>
              <li>Damage from improper assembly</li>
              <li>Modifications made to the product</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3 mt-6">How to Make a Claim</h3>
            <p className="text-muted-foreground leading-relaxed">
              To make a warranty claim, please contact our customer service team with your order number, photos of the issue, 
              and a description of the problem. We'll review your claim and provide a resolution within 5-7 business days.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WarrantyPage;
