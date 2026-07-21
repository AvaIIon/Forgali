import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { subscribeEmail } from "@/services/shopifyService";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Pre-footer email capture tied to the WELCOME10 offer. Submitting the form
// is the express consent (CASL): the copy states exactly what the signup is.
export const EmailCaptureBand = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setState("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await subscribeEmail(trimmed);
      if (res.ok) {
        setState(res.alreadySubscribed ? "already" : "done");
      } else {
        setState("error");
        setErrorMsg(res.message || "Something went wrong — please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Something went wrong — please try again.");
    }
  };

  return (
    <section aria-label="Email signup" className="bg-[#4A647C] px-4 py-14 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          Get 10% Off Your First Dining or Living Order
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Join the Forgali list for news, offers, and early access to new
          arrivals — and use code{" "}
          <span className="font-bold tracking-wide">WELCOME10</span> today for
          10% off Dining &amp; Living.
        </p>

        {state === "done" || state === "already" ? (
          <p role="status" className="mt-6 rounded-full bg-white/15 px-6 py-3 text-sm font-medium">
            {state === "done"
              ? "You're in! Use code WELCOME10 at checkout for 10% off Dining & Living."
              : "This email already has a Forgali account — code WELCOME10 still works at checkout."}
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                className="h-12 w-full rounded-full border border-white/30 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none transition-colors focus:border-white focus:bg-white/15"
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="h-12 shrink-0 rounded-full bg-white px-8 text-sm font-semibold text-[#4A647C] transition-colors hover:bg-[#f2f4f6] disabled:opacity-70"
            >
              {state === "loading" ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "Get My 10% Off"
              )}
            </button>
          </form>
        )}

        {state === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-200">{errorMsg}</p>
        )}
      </div>
    </section>
  );
};

export default EmailCaptureBand;
