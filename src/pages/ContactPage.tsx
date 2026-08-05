import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Clock, Globe } from "lucide-react";
import { Seo } from "@/components/Seo";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // No backend endpoint exists, so the form composes an email in the visitor's
  // mail client rather than silently discarding the message on a native submit
  // (which just reloaded the SPA).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "a customer"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:support@forgali.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact Forgali – Support for Orders & Delivery"
        description="Forgali is a 100% online furniture store — no showroom or phone line. Email support@forgali.com with any question; we respond within 24 hours."
        path="/contact"
      />
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Our friendly team is here to help you find the perfect bed for your family.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Mail className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a>
              <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
            </div>

            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Clock className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Support Hours</h3>
              <p className="text-muted-foreground">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
            </div>

            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Globe className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Online Only</h3>
              <p className="text-muted-foreground">100% online store — no retail showroom or phone line</p>
              <p className="text-sm text-muted-foreground mt-2">Serving all of Canada with free shipping</p>
            </div>
          </div>

          <div className="bg-[#f2f4f6] border-l-4 border-[#4A647C] rounded-lg p-6 mb-12">
            <p className="font-bold mb-2">A note about older listings</p>
            <p className="text-sm text-muted-foreground">
              Forgali's earlier chapter as Forgali Design Centre — a custom-furniture
              showroom in Mississauga — is permanently closed. Directory listings that
              mention a showroom at 2111 Dunwin Dr., a Concord location, or phone
              numbers such as (905) 820-2020 or (905) 820-9461 are out of date: those
              locations are closed and the numbers are no longer in service. Forgali
              now operates entirely online, and the way to reach us is by email:{" "}
              <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a>.
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">Name</label>
                <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">Email</label>
                <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="contact-message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <button type="submit" className="bg-[#4A647C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3A5066] transition-colors">
                Send Message
              </button>
              <p className="text-xs text-muted-foreground">
                This opens your email app with the message ready to send. Prefer to write us directly?
                Email <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a>.
              </p>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
