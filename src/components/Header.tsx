import { useState } from "react";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import LoginDialog from "@/components/LoginDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProxiedImage } from "@/lib/imageProxy";

const navItems = [
  {
    label: "Dining",
    href: "/category/dining",
    image: "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444",
    subcategories: [
      { name: "Dining Tables", href: "/category/dining?subcategory=dining-tables" },
      { name: "Dining Chairs", href: "/category/dining?subcategory=dining-chairs" },
      { name: "Dining Benches", href: "/category/dining?subcategory=dining-benches" },
      { name: "Bar & Counter Chairs", href: "/category/dining?subcategory=bar-counter-chairs" },
      { name: "Dining Sets", href: "/category/dining?subcategory=dining-sets" },
    ]
  },
  {
    label: "Living",
    href: "/category/living",
    image: "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600567600-016__1.jpg?v=1783608423",
    subcategories: [
      { name: "Coffee Tables", href: "/category/living?subcategory=coffee-tables" },
      { name: "Console Tables", href: "/category/living?subcategory=console-tables" },
      { name: "Side Tables", href: "/category/living?subcategory=side-tables" },
      { name: "Sideboards", href: "/category/living?subcategory=sideboards" },
      { name: "TV Stands", href: "/category/living?subcategory=tv-stands" },
      { name: "Shelves", href: "/category/living?subcategory=shelves" },
    ]
  },
  {
    label: "Bedroom",
    href: "/category/bedroom",
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/2875.jpg",
    subcategories: [
      { name: "Bunk Beds", href: "/category/bunk-beds" },
      { name: "Loft Beds", href: "/category/loft-beds" },
      { name: "Single Beds", href: "/category/single-beds" },
      { name: "Beds with Slide", href: "/category/bunk-beds?subcategory=with-slide" },
      { name: "Beds with Stairs", href: "/category/bunk-beds?subcategory=with-stairs" },
      { name: "Toddler & Floor Beds", href: "/category/single-beds?subcategory=floor-bed" },
    ]
  },
  {
    label: "Storage & Accessories",
    href: "/category/accessories",
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/200006-002__2.jpg",
    subcategories: [
      { name: "Mattresses", href: "/category/mattresses" },
      { name: "Dressers & Storage", href: "/category/accessories?subcategory=storage" },
      { name: "Nightstands", href: "/category/accessories?subcategory=nightstands" },
      { name: "Desks", href: "/category/accessories?subcategory=desks" },
      { name: "Bookcases & Shelves", href: "/category/accessories?subcategory=bookcases-shelves" },
    ]
  },
  { label: "Smart Deals", href: "/smart-deals", highlight: true },
];

export const Header = () => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, logout } = useAdmin();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const totalItems = getTotalItems();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          <Link to="/" className="flex flex-col items-center justify-center gap-1">
            <img
              src="/forgali-logo-dark.png"
              alt="Forgali"
              className="h-8 w-auto"
              width={1172}
              height={248}
            />
            <p className="text-[10px] text-muted-foreground tracking-[0.2em]">
              SOLID WOOD FURNITURE
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors">
                    <User className="w-5 h-5 text-foreground cursor-pointer" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-muted-foreground">Logged in</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="cursor-pointer">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setIsLoginDialogOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
              >
                <User className="w-5 h-5 text-foreground cursor-pointer" />
              </button>
            )}
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
      
      {/* Login Dialog */}
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
      
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
                            {item.image && (
                              <div className="relative rounded-lg overflow-hidden">
                                <img 
                                  src={getProxiedImage(item.image)}
                                  alt={`Shop ${item.label}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <p className="font-semibold">Shop {item.label}</p>
                                </div>
                              </div>
                            )}
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
