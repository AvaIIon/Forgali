import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";

// Baseline terms of service. Daniel should have this reviewed and updated with
// the registered business name and governing jurisdiction before relying on it.
const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/terms")}
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            The terms that apply when you shop with us. Effective July 2026.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Orders &amp; Acceptance</h2>
            <p>
              Placing an order is an offer to purchase. We confirm orders by email, and we reserve the
              right to decline or cancel an order — for example, if an item is unavailable or a pricing
              error occurs. Where we cancel an order you have paid for, we issue a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Pricing &amp; Payment</h2>
            <p>
              All prices are shown in Canadian dollars (CAD). Applicable taxes are calculated at
              checkout based on your shipping address. We make every effort to display accurate prices
              and product information; in the rare event of an error, we'll contact you before
              processing the affected order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Shipping, Returns &amp; Warranty</h2>
            <p>
              Delivery, returns, and warranty coverage are governed by our{" "}
              <Link to="/shipping" className="text-primary hover:underline">Shipping</Link>,{" "}
              <Link to="/returns" className="text-primary hover:underline">Returns</Link>, and{" "}
              <Link to="/warranty" className="text-primary hover:underline">Warranty</Link> pages,
              which form part of these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Use of This Site</h2>
            <p>
              You agree to use this site lawfully and not to interfere with its operation or security.
              Product images and content are provided for your personal, non-commercial use.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:daniel@forgali.com" className="text-primary hover:underline">daniel@forgali.com</a>.
              See also our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
