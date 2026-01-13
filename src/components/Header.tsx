import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Bunk Beds", hasDropdown: true, href: "/category/bunk-beds" },
  { label: "Loft Beds", hasDropdown: true, href: "/category/loft-beds" },
  { label: "Single Beds", hasDropdown: true, href: "/category/single-beds" },
  { label: "Storage & Accessories", hasDropdown: true, href: "/category/accessories" },
  { label: "Smart Deals", hasDropdown: false, highlight: true, href: "/" },
];

export const Header = () => {
  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
        Free Canada-Wide Shipping on All Orders!
      </div>
      
      {/* Main header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search our store" 
              className="pl-10 bg-background border-border rounded-full h-10"
            />
          </div>
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'serif' }}>
              Forgali
            </h1>
            <p className="text-[10px] text-center text-muted-foreground tracking-[0.2em]">
              SOLID WOOD BEDS
            </p>
          </Link>
          
          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Country:</span>
              <div className="flex items-center gap-1">
                <span className="text-lg">🇨🇦</span>
                <span>CAD</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <User className="w-5 h-5 text-foreground cursor-pointer" />
            <ShoppingCart className="w-5 h-5 text-foreground cursor-pointer" />
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 py-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.href} 
                  className={`flex items-center gap-1 text-sm whitespace-nowrap transition-colors text-foreground hover:text-primary
                    ${item.highlight ? 'text-primary font-medium' : ''}
                  `}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
