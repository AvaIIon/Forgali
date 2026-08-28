import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-rail mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex flex-col">
            <img
              src="/forgali-logo-light.png"
              alt="Forgali"
              className="h-8 w-auto"
              width={1670}
              height={335}
            />
            <span className="text-[10px] text-background/60 tracking-[0.2em] mt-1">
              SOLID WOOD FURNITURE
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/category/bunk-beds" className="hover:text-background">Bunk Beds</Link></li>
              <li><Link to="/category/loft-beds" className="hover:text-background">Loft Beds</Link></li>
              <li><Link to="/category/single-beds" className="hover:text-background">Single Beds</Link></li>
              <li><Link to="/category/dining" className="hover:text-background">Dining</Link></li>
              <li><Link to="/category/living" className="hover:text-background">Living</Link></li>
              <li><Link to="/plank-and-beam" className="hover:text-background">Plank &amp; Beam</Link></li>
              <li><Link to="/category/accessories" className="hover:text-background">Accessories</Link></li>
              <li><Link to="/smart-deals" className="hover:text-background">Smart Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-background">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-background">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-background">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-background">Returns</Link></li>
              <li><Link to="/assembly" className="hover:text-background">Assembly Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-background">About Forgali</Link></li>
              <li><Link to="/warranty" className="hover:text-background">Warranty</Link></li>
              <li><Link to="/safety-standards" className="hover:text-background">Safety Standards</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            {/* Static brand marks — no profile URLs exist yet, so don't make
                them look clickable (trust-eroding dead links) */}
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-background/70" />
              <Instagram className="w-5 h-5 text-background/70" />
              <Twitter className="w-5 h-5 text-background/70" />
              <Youtube className="w-5 h-5 text-background/70" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50 space-y-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-background">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link to="/terms" className="hover:text-background">Terms of Service</Link>
          </div>
          <p>© 2026 Forgali. All rights reserved.</p>
          <p>Powered by Avallon</p>
        </div>
      </div>
    </footer>
  );
};
