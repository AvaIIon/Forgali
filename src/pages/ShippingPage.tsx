import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Truck, PackageSearch, Users, ClipboardCheck } from "lucide-react";

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Shipping Information – Free Canada-Wide | Forgali"
        description="How Forgali shipping works: free Canada-wide delivery, processing times, tracking, and what to check when your furniture arrives."
        path="/shipping"
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shipping Information
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Solid wood furniture, shipped straight to your door — free, anywhere in Canada.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Truck className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Free Canada-Wide Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Every order ships free to any Canadian address — no minimums, no surprises
                at checkout.
              </p>
            </div>
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <PackageSearch className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Tracking on Every Order</h3>
              <p className="text-muted-foreground text-sm">
                As soon as your order ships you'll receive a tracking number by email, so
                you can follow your delivery every step of the way.
              </p>
            </div>
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <ClipboardCheck className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Check Your Boxes on Arrival</h3>
              <p className="text-muted-foreground text-sm">
                When your furniture arrives, inspect all boxes and note any visible damage
                at delivery — it makes resolving carrier issues much faster.
              </p>
            </div>
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Users className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Heavy Boxes — Grab a Helper</h3>
              <p className="text-muted-foreground text-sm">
                Solid wood means large, heavy packages. Having two adults available makes
                moving boxes into your home much easier.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Processing &amp; Delivery Times</h2>
            <p className="text-muted-foreground mb-3">
              Most orders are processed and prepared for shipment within about one week,
              with standard delivery typically taking 5–10 business days in total. Transit
              times vary by destination.
            </p>
            <p className="text-muted-foreground mb-3">
              If an item is temporarily out of stock, it may need to ship from a secondary
              warehouse and can take approximately 12–15 business days. All orders are
              subject to stock availability — if anything changes with your order, we'll
              email you right away.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Questions About a Delivery?</h2>
            <p className="text-muted-foreground">
              Email <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a> with
              your order number and we'll respond within 24 hours. For returns and order
              changes, see our <Link to="/returns" className="text-primary hover:underline">Returns &amp; Cancellations policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPage;
