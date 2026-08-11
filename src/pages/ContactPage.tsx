import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Clock, Globe, Check, Copy, ExternalLink, ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";

const RECIPIENT = "daniel@forgali.com";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);
  const [copied, setCopied] = useState(false);

  // No backend endpoint exists, so the form composes an email in the visitor's
  // mail client rather than silently discarding the message on a native submit
  // (which just reloaded the SPA).
  //
  // A bare mailto: is a dead end for anyone without a registered mail handler —
  // most desktop webmail users. The browser reports nothing back to us, so we
  // cannot detect that case: the click just does nothing and the visitor
  // believes the message was sent. So rather than guess, we always surface the
  // handoff panel below, which carries the same message as copyable text plus
  // direct webmail compose links.
  const subject = `Website enquiry from ${name || "a customer"}`;
  const plainBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const q = encodeURIComponent;

  const mailtoHref = `mailto:${RECIPIENT}?subject=${q(subject)}&body=${q(plainBody)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(RECIPIENT)}&su=${q(subject)}&body=${q(plainBody)}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${q(RECIPIENT)}&subject=${q(subject)}&body=${q(plainBody)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHandedOff(true);
    window.location.href = mailtoHref;
  };

  const handleCopy = async () => {
    const full = `To: ${RECIPIENT}\nSubject: ${subject}\n\n${plainBody}`;
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      // clipboard API needs a secure context and permission; fall back to the
      // old execCommand path so the button still does something useful.
      const scratch = document.createElement("textarea");
      scratch.value = full;
      scratch.setAttribute("readonly", "");
      scratch.style.position = "fixed";
      scratch.style.opacity = "0";
      document.body.appendChild(scratch);
      scratch.select();
      document.execCommand("copy");
      document.body.removeChild(scratch);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact Forgali – Support for Orders & Delivery"
        description="Forgali is a 100% online furniture store — no showroom or phone line. Email daniel@forgali.com with any question; we respond within 24 hours."
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
              <a href="mailto:daniel@forgali.com" className="text-primary hover:underline">daniel@forgali.com</a>
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
              <a href="mailto:daniel@forgali.com" className="text-primary hover:underline">daniel@forgali.com</a>.
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {handedOff ? (
              <div role="status" aria-live="polite" className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-full bg-[#4A647C] p-1.5">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">Your message is ready to send</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We've opened your email app with this message addressed to{" "}
                      <span className="font-medium text-foreground">{RECIPIENT}</span>. Press
                      send there and we'll reply within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="bg-[#f2f4f6] border-l-4 border-[#4A647C] rounded-lg p-5">
                  <p className="font-medium text-sm mb-1">Nothing opened?</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    That's normal if you read your mail in a browser. Use one of these instead —
                    your message is already written.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 bg-[#4A647C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3A5066] transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy message"}
                    </button>
                    <a
                      href={gmailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/60 transition-colors"
                    >
                      Open in Gmail <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={outlookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/60 transition-colors"
                    >
                      Open in Outlook <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Or write to us directly at{" "}
                    <a href={`mailto:${RECIPIENT}`} className="text-primary hover:underline">
                      {RECIPIENT}
                    </a>
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setHandedOff(false)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to edit my message
                </button>
              </div>
            ) : (
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
                  Email <a href={`mailto:${RECIPIENT}`} className="text-primary hover:underline">{RECIPIENT}</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
