import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, CheckCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";

const SafetyStandardsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/safety-standards")}
      />
      <Header />
      
      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
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
              <Shield className="w-8 h-8 text-brand" />
              <h2 className="text-2xl font-bold">Certifications & Compliance</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The children's beds we carry are manufactured and tested to applicable children's furniture
              safety standards. We're committed to offering safe, well-built products for your family.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Built to Health Canada Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Our children's beds are designed to align with Health Canada guidance for children's furniture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Low-VOC Finishes</h3>
                  <p className="text-sm text-muted-foreground">
                    Beds are finished with durable, low-VOC finishes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Structural Integrity</h3>
                  <p className="text-sm text-muted-foreground">
                    Beds are tested for weight capacity and structural stability to support long-term use.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Guardrails on Elevated Beds</h3>
                  <p className="text-sm text-muted-foreground">
                    Elevated beds include guardrails designed to meet standard safety spacing requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-tint rounded-lg p-8">
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
