import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, Clock, Globe, Check, Copy, ExternalLink, ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";

const RECIPIENT = "daniel@forgali.com";
const PHONE_DISPLAY = "(647) 527-2110";
// tel: wants E.164 so mobile dialers and desktop click-to-call handlers both
// resolve it; the display string stays formatted for people.
const PHONE_E164 = "+16475272110";

// Web3Forms posts the submission straight to RECIPIENT's inbox. The access key
// is public by design — it names the destination mailbox and grants nothing
// else — which is why it belongs in the source rather than a Vercel env var.
// While it is empty the form falls back to the mail-client handoff below, so
// an unconfigured build still reaches a human.
const WEB3FORMS_ACCESS_KEY: string = "0119e47d-0a81-46d7-8e54-aa2c36803b48";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type SendState = "idle" | "sending" | "sent" | "error";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SendState>("idle");
  // Web3Forms' honeypot convention: bots fill every field, humans never see it.
  const [honeypot, setHoneypot] = useState("");

  // A bare mailto: is a dead end for anyone without a registered mail handler —
  // most desktop webmail users. The browser reports nothing back to us, so that
  // failure cannot be detected: the click just does nothing and the visitor
  // believes the message was sent. The handoff panel therefore always appears,
  // carrying the message as copyable text plus webmail compose links. It also
  // doubles as the recovery path when a real send fails.
  const subject = `Website enquiry from ${name || "a customer"}`;
  const plainBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const q = encodeURIComponent;

  const mailtoHref = `mailto:${RECIPIENT}?subject=${q(subject)}&body=${q(plainBody)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(RECIPIENT)}&su=${q(subject)}&body=${q(plainBody)}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${q(RECIPIENT)}&subject=${q(subject)}&body=${q(plainBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Not configured yet — keep the handoff rather than pretending to send.
    if (!WEB3FORMS_ACCESS_KEY) {
      setHandedOff(true);
      window.location.href = mailtoHref;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: "Forgali website",
          name,
          email,
          message,
          replyto: email,
          botcheck: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      // Never strand the visitor: fall through to the handoff panel so the
      // message they already typed can still reach us.
      setStatus("error");
      setHandedOff(true);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setHandedOff(false);
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
        {...seoProps("/contact")}
      />
      <Header />
      
      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-brand-tint rounded-lg p-6">
              <Mail className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>
              <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Phone className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <a href={`tel:${PHONE_E164}`} className="text-brand-accent hover:underline">{PHONE_DISPLAY}</a>
              <p className="text-sm text-muted-foreground mt-2">Monday to Friday, 9:00 AM to 5:00 PM EST</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Clock className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">Support Hours</h3>
              <p className="text-muted-foreground">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Globe className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">Online Only</h3>
              <p className="text-muted-foreground">100% online store with no retail showroom</p>
              <p className="text-sm text-muted-foreground mt-2">Serving all of Canada with free shipping</p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {status === "sent" ? (
              <div role="status" aria-live="polite" className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-full bg-brand p-1.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">Thanks — your message is on its way</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      It's landed in our inbox and we'll reply to{" "}
                      <span className="font-medium text-foreground">{email}</span> within 24
                      hours, Monday to Friday.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Send another message
                </button>
              </div>
            ) : handedOff ? (
              <div role="status" aria-live="polite" className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-full bg-brand p-1.5">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    {status === "error" ? (
                      <>
                        <p className="font-bold">We couldn't send that automatically</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sorry — something went wrong on our end. Your message is safe and
                          still written out below; here are three ways to get it to{" "}
                          <span className="font-medium text-foreground">{RECIPIENT}</span>.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-bold">Your message is ready to send</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          We've opened your email app with this message addressed to{" "}
                          <span className="font-medium text-foreground">{RECIPIENT}</span>.
                          Press send there and we'll reply within 24 hours.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-brand-tint border-l-4 border-brand rounded-lg p-5">
                  <p className="font-medium text-sm mb-1">
                    {status === "error" ? "Send it yourself" : "Nothing opened?"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {status === "error"
                      ? "Pick whichever is easiest — your message is already written."
                      : "That's normal if you read your mail in a browser. Use one of these instead — your message is already written."}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors"
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
                    <a href={`mailto:${RECIPIENT}`} className="text-brand-accent hover:underline">
                      {RECIPIENT}
                    </a>
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setHandedOff(false);
                    setStatus("idle");
                  }}
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

                {/* Honeypot — hidden from people, irresistible to bots. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  checked={honeypot === "true"}
                  onChange={(e) => setHoneypot(e.target.checked ? "true" : "")}
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-brand text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
                <p className="text-xs text-muted-foreground">
                  {WEB3FORMS_ACCESS_KEY
                    ? "We'll reply within 24 hours, Monday to Friday."
                    : "This opens your email app with the message ready to send."}{" "}
                  Prefer to reach us directly? Email{" "}
                  <a href={`mailto:${RECIPIENT}`} className="text-brand-accent hover:underline">{RECIPIENT}</a>{" "}
                  or call{" "}
                  <a href={`tel:${PHONE_E164}`} className="text-brand-accent hover:underline">{PHONE_DISPLAY}</a>.
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
