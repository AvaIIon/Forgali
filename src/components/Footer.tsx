import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/category/bunk-beds" className="hover:text-background">Bunk Beds</Link></li>
              <li><Link to="/category/loft-beds" className="hover:text-background">Loft Beds</Link></li>
              <li><Link to="/category/single-beds" className="hover:text-background">Single Beds</Link></li>
              <li><Link to="/category/accessories" className="hover:text-background">Accessories</Link></li>
              <li><Link to="/smart-deals" className="hover:text-background">Smart Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-background">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-background">FAQs</Link></li>
              <li><a href="#" className="hover:text-background">Shipping Info</a></li>
              <li><a href="#" className="hover:text-background">Returns</a></li>
              <li><a href="#" className="hover:text-background">Assembly Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-background">About Forgali</Link></li>
              <li><Link to="/warranty" className="hover:text-background">Warranty</Link></li>
              <li><Link to="/safety-standards" className="hover:text-background">Safety Standards</Link></li>
              <li><a href="#" className="hover:text-background">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-background/70 hover:text-background cursor-pointer" />
              <Instagram className="w-5 h-5 text-background/70 hover:text-background cursor-pointer" />
              <Twitter className="w-5 h-5 text-background/70 hover:text-background cursor-pointer" />
              <Youtube className="w-5 h-5 text-background/70 hover:text-background cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50 space-y-2">
          <p>© 2026 Forgali. All rights reserved.</p>
          <p>Powered by Avallon</p>
        </div>
      </div>
    </footer>
  );
};
