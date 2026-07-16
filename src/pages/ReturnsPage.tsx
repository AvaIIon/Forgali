import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Returns & Cancellations – 30-Day Policy | Forgali"
        description="Forgali's return policy: 30-day returns on unused items, order changes and cancellations, and how we handle damaged or incorrect deliveries."
        path="/returns"
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Returns, Changes &amp; Cancellations
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Straightforward policies, no fine-print games. Effective July 16, 2026.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Changes &amp; Cancellations</h2>
            <p className="text-muted-foreground mb-3">
              Need to change a colour or size, or cancel altogether? Email us as soon as
              possible — we can accommodate changes and cancellations any time
              <strong> before your order ships</strong>. Once an order has shipped, it can
              no longer be changed or cancelled (but it can be returned, below).
            </p>
            <p className="text-muted-foreground">
              Address changes while an order is in transit may incur the carrier's
              administrative or rerouting fees.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">30-Day Returns</h2>
            <p className="text-muted-foreground mb-3">
              Returns of <strong>new, unused, unassembled, and undamaged</strong> items are
              accepted within <strong>30 days of delivery</strong>. Here's how it works:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-3">
              <li>
                Email <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a> for
                a return authorization. Include a quick photo of the item — a phone
                picture is perfect. We just need a "before" image in case anything is
                damaged on the way back.
              </li>
              <li>
                We'll reply with your return authorization number and the return address.
                Write the authorization number on the shipping label.
              </li>
              <li>
                Ship the item back at your expense via the same carrier and service it
                arrived with. Original packaging is preferred; if it's gone, please pack
                the item well enough to survive the trip.
              </li>
            </ol>
            <p className="text-muted-foreground">
              Your refund is issued once the return arrives in undamaged, re-sellable
              condition. A 20% restocking fee may apply.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Damaged, Defective, or Incorrect Items</h2>
            <p className="text-muted-foreground">
              If your item arrives damaged or defective, or you received the wrong item,
              contact us with photos. In these cases <strong>we cover the return
              shipping, the restocking fee is waived</strong>, and we'll arrange a
              replacement or a full refund — whichever you prefer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Missing Parts</h2>
            <p className="text-muted-foreground">
              Missing a bolt bag or a panel? Email us with your order number and we'll get
              replacement parts moving. All claims for missing or damaged parts must be
              submitted within 30 days of delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Email <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a> —
              we respond within 24 hours. See also our{" "}
              <Link to="/shipping" className="text-primary hover:underline">Shipping Information</Link> and{" "}
              <Link to="/warranty" className="text-primary hover:underline">Warranty</Link> pages.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReturnsPage;
