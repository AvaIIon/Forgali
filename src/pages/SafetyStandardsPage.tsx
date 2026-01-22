import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, CheckCircle } from "lucide-react";

const SafetyStandardsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Safety Standards
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Your child's safety is our top priority.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-background border border-border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-[#4A647C]" />
              <h2 className="text-2xl font-bold">Certifications & Compliance</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All Forgali products meet or exceed Canadian safety standards and regulations. We are committed to providing 
              the safest possible products for your family.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#4A647C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Health Canada Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    All products meet Health Canada safety requirements for children's furniture.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#4A647C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Non-Toxic Finishes</h3>
                  <p className="text-sm text-muted-foreground">
                    All finishes are water-based and free from harmful chemicals, safe for children and the environment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#4A647C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Structural Integrity</h3>
                  <p className="text-sm text-muted-foreground">
                    All beds are tested for weight capacity and structural stability to ensure long-term safety.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#4A647C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Guardrail Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    All elevated beds include guardrails that meet or exceed safety spacing requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f2f4f6] rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Safety Tips</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Always follow assembly instructions carefully</li>
              <li>Ensure all hardware is properly tightened</li>
              <li>Regularly inspect beds for loose parts or damage</li>
              <li>Use appropriate mattress sizes as specified</li>
              <li>Keep beds away from windows and heating sources</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SafetyStandardsPage;
