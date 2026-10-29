import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, Clock, Globe, Check, Copy, ExternalLink, ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { useLocale } from "@/i18n/LocaleContext";

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
  const { t } = useLocale();
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
  const subject = t("contact.subject", { name: name || t("contact.aCustomer") });
  const plainBody = `${t("contact.bodyName")}${name}\n${t("contact.bodyEmail")}${email}\n\n${message}`;
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
    const full = `${t("contact.copyTo")}${RECIPIENT}\n${t("contact.copySubject")}${subject}\n\n${plainBody}`;
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
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("contact.lead")}
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-brand-tint rounded-lg p-6">
              <Mail className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact.email")}</h3>
              <a href="mailto:daniel@forgali.com" className="text-brand-accent hover:underline">daniel@forgali.com</a>
              <p className="text-sm text-muted-foreground mt-2">{t("contact.respond24")}</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Phone className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact.phone")}</h3>
              <a href={`tel:${PHONE_E164}`} className="text-brand-accent hover:underline">{PHONE_DISPLAY}</a>
              <p className="text-sm text-muted-foreground mt-2">{t("contact.hoursLine")}</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Clock className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact.supportHours")}</h3>
              <p className="text-muted-foreground">{t("contact.monFri")}</p>
              <p className="text-muted-foreground">{t("contact.hours")}</p>
            </div>

            <div className="bg-brand-tint rounded-lg p-6">
              <Globe className="w-8 h-8 text-brand mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact.onlineOnly")}</h3>
              <p className="text-muted-foreground">{t("contact.onlineBody")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("contact.servingCanada")}</p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{t("contact.formTitle")}</h2>

            {status === "sent" ? (
              <div role="status" aria-live="polite" className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-full bg-brand p-1.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">{t("contact.sentTitle")}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("contact.sentBody1")}<span className="font-medium text-foreground">{email}</span>{t("contact.sentBody2")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {t("contact.sendAnother")}
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
                        <p className="font-bold">{t("contact.errorTitle")}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("contact.errorBody1")}<span className="font-medium text-foreground">{RECIPIENT}</span>{t("contact.errorBody2")}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-bold">{t("contact.readyTitle")}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("contact.readyBody1")}<span className="font-medium text-foreground">{RECIPIENT}</span>{t("contact.readyBody2")}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-brand-tint border-l-4 border-brand rounded-lg p-5">
                  <p className="font-medium text-sm mb-1">
                    {status === "error" ? t("contact.sendYourself") : t("contact.nothingOpened")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {status === "error" ? t("contact.pickEasiest") : t("contact.normalBrowser")}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? t("contact.copied") : t("contact.copyMessage")}
                    </button>
                    <a
                      href={gmailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/60 transition-colors"
                    >
                      {t("contact.openGmail")} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={outlookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/60 transition-colors"
                    >
                      {t("contact.openOutlook")} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    {t("contact.writeDirectly")}{" "}
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
                  <ArrowLeft className="w-4 h-4" /> {t("contact.backEdit")}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">{t("contact.name")}</label>
                  <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">{t("contact.email")}</label>
                  <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">{t("contact.message")}</label>
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
                  {status === "sending" ? t("contact.sending") : t("contact.send")}
                </button>
                <p className="text-xs text-muted-foreground">
                  {WEB3FORMS_ACCESS_KEY ? t("contact.replyNote") : t("contact.opensMailApp")}{" "}
                  {t("contact.preferDirect")}{" "}
                  <a href={`mailto:${RECIPIENT}`} className="text-brand-accent hover:underline">{RECIPIENT}</a>{" "}
                  {t("contact.orCall")}{" "}
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
