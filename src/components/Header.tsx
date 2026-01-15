import { useState } from "react";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  { 
    label: "Bunk Beds", 
    href: "/category/bunk-beds",
    subcategories: [
      { name: "Twin Over Twin Bunk Beds", href: "/category/bunk-beds" },
      { name: "Twin Over Full Bunk Beds", href: "/category/bunk-beds" },
      { name: "Full Over Full Bunk Beds", href: "/category/bunk-beds" },
      { name: "L-Shaped Bunk Beds", href: "/category/bunk-beds" },
      { name: "Triple Bunk Beds", href: "/category/bunk-beds" },
      { name: "Bunk Beds with Stairs", href: "/category/bunk-beds" },
      { name: "Bunk Beds with Slide", href: "/category/bunk-beds" },
    ]
  },
  { 
    label: "Loft Beds", 
    href: "/category/loft-beds",
    subcategories: [
      { name: "Low Loft Beds", href: "/category/loft-beds" },
      { name: "Mid Loft Beds", href: "/category/loft-beds" },
      { name: "High Loft Beds", href: "/category/loft-beds" },
      { name: "Loft Beds with Desk", href: "/category/loft-beds" },
      { name: "Loft Beds with Storage", href: "/category/loft-beds" },
    ]
  },
  { 
    label: "Single Beds", 
    href: "/category/single-beds",
    subcategories: [
      { name: "Twin Beds", href: "/category/single-beds" },
      { name: "Full Beds", href: "/category/single-beds" },
      { name: "Platform Beds", href: "/category/single-beds" },
      { name: "Beds with Storage", href: "/category/single-beds" },
      { name: "Trundle Beds", href: "/category/single-beds" },
    ]
  },
  { 
    label: "Storage & Accessories", 
    href: "/category/accessories",
    subcategories: [
      { name: "Under Bed Storage", href: "/category/accessories" },
      { name: "Bed Curtains", href: "/category/accessories" },
      { name: "Slides", href: "/category/accessories" },
      { name: "Guardrails", href: "/category/accessories" },
      { name: "Ladders", href: "/category/accessories" },
    ]
  },
  { label: "Smart Deals", href: "/", highlight: true },
];

export const Header = () => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
        Free Canada-Wide Shipping on All Orders!
      </div>
      
      {/* Main header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
          {/* Search - Left */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search our store" 
              className="pl-10 bg-background border-border rounded-full h-10"
            />
          </div>
          
          {/* Logo - Center */}
          <Link to="/" className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'serif' }}>
              Forgali
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em]">
              SOLID WOOD BEDS
            </p>
          </Link>
          
          {/* Right side */}
          <div className="flex items-center gap-6 justify-end">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Country:</span>
              <div className="flex items-center gap-1">
                <span className="text-lg">🇨🇦</span>
                <span>CAD</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <User className="w-5 h-5 text-foreground cursor-pointer" />
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 text-foreground cursor-pointer" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <NavigationMenu className="max-w-none justify-center">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.subcategories ? (
                    <>
                      <NavigationMenuTrigger 
                        className={`text-sm whitespace-nowrap bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                          item.highlight ? 'text-primary font-medium' : ''
                        }`}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[600px] p-6 bg-background border border-border shadow-lg">
                          <div className="grid grid-cols-2 gap-8">
                            {/* Subcategories */}
                            <div className="space-y-4">
                              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                {item.label}
                              </h3>
                              <ul className="space-y-2">
                                {item.subcategories.map((sub) => (
                                  <li key={sub.name}>
                                    <NavigationMenuLink asChild>
                                      <Link 
                                        to={sub.href}
                                        className="block text-sm py-1 hover:text-primary transition-colors"
                                      >
                                        {sub.name}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                              <Link 
                                to={item.href} 
                                className="inline-block text-sm font-medium text-primary hover:underline mt-2"
                              >
                                Shop All {item.label} →
                              </Link>
                            </div>
                            {/* Featured Image */}
                            <div className="relative rounded-lg overflow-hidden">
                              <img 
                                src="https://bedsmart.ca/wp-content/uploads/2022/06/139.jpg"
                                alt={`Shop ${item.label}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-4 left-4 text-white">
                                <p className="font-semibold">Shop {item.label}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link 
                      to={item.href}
                      className={`flex items-center gap-1 px-4 py-2 text-sm whitespace-nowrap transition-colors text-foreground hover:text-primary
                        ${item.highlight ? 'text-primary font-medium' : ''}
                      `}
                    >
                      {item.label}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
};
