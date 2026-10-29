import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import type { MessageKey } from "@/i18n/messages";
import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";

const items: Array<{ icon: typeof Truck; label: MessageKey; href: string }> = [
  { icon: Truck, label: "common.freeShipping", href: "/shipping" },
  { icon: RotateCcw, label: "common.returns30", href: "/returns" },
  { icon: BadgeCheck, label: "strip.warranty", href: "/warranty" },
  { icon: ShieldCheck, label: "strip.safety", href: "/safety-standards" },
];

export const GuaranteeStrip = () => {
  const { t } = useLocale();
  return (
  <section className="border-y border-border bg-brand-tint">
    <div className="max-w-rail mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, href }) => (
        <Link
          key={href}
          to={href}
          className="flex items-center justify-center gap-2 text-sm font-medium text-foreground/80 hover:text-brand-accent transition-colors"
        >
          <Icon className="w-5 h-5 text-brand shrink-0" />
          <span>{t(label)}</span>
        </Link>
      ))}
    </div>
  </section>
  );
};

export default GuaranteeStrip;
