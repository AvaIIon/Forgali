import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";

const items = [
  { icon: Truck, label: "Free Canada-Wide Shipping", href: "/shipping" },
  { icon: RotateCcw, label: "30-Day Returns", href: "/returns" },
  { icon: BadgeCheck, label: "Warranty Coverage", href: "/warranty" },
  { icon: ShieldCheck, label: "Built to Safety Standards", href: "/safety-standards" },
];

export const GuaranteeStrip = () => (
  <section className="border-y border-border bg-[#f2f4f6]">
    <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, href }) => (
        <Link
          key={href}
          to={href}
          className="flex items-center justify-center gap-2 text-sm font-medium text-foreground/80 hover:text-[#4A647C] transition-colors"
        >
          <Icon className="w-5 h-5 text-[#4A647C] shrink-0" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  </section>
);

export default GuaranteeStrip;
