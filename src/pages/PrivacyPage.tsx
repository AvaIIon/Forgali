import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

// Baseline privacy policy covering what the storefront actually does: order
// processing via Shopify's hosted checkout and optional email marketing
// sign-up. Daniel should have this reviewed against PIPEDA/CASL and updated
// with the registered business name/address before relying on it.
const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Privacy Policy | Forgali"
        description="How Forgali collects, uses, and protects your personal information when you shop with us or subscribe to our emails."
        path="/privacy"
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            How we handle your information. Effective July 2026.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
            <p className="mb-3">
              When you place an order, our checkout is handled by Shopify, which collects the
              information needed to process and ship your order — your name, email address, shipping
              and billing address, and payment details. Payment card information is processed by
              Shopify's PCI-compliant payment system; we never see or store your full card number.
            </p>
            <p>
              If you subscribe to our emails or create an account, we collect your email address (and
              name, if you provide it) so we can send order updates and, with your consent, marketing
              messages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To process, fulfil, and deliver your orders and provide customer support.</li>
              <li>To send transactional messages such as order and shipping confirmations.</li>
              <li>To send marketing emails where you have given consent — you can unsubscribe at any time using the link in every email.</li>
              <li>To operate, maintain, and improve our store.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Sharing</h2>
            <p>
              We share personal information only with the service providers who help us run the store —
              our e-commerce platform (Shopify), payment processors, and shipping carriers — and only
              as needed to serve you. We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Your Choices</h2>
            <p>
              You can unsubscribe from marketing emails at any time, and you may request access to,
              correction of, or deletion of your personal information by emailing us. We respond to
              privacy requests within a reasonable time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Questions about your privacy? Email{" "}
              <a href="mailto:daniel@forgali.com" className="text-primary hover:underline">daniel@forgali.com</a>.
              See also our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
