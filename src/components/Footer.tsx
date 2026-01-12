import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">Bunk Beds</a></li>
              <li><a href="#" className="hover:text-background">Loft Beds</a></li>
              <li><a href="#" className="hover:text-background">Single Beds</a></li>
              <li><a href="#" className="hover:text-background">Accessories</a></li>
              <li><a href="#" className="hover:text-background">Smart Deals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">Contact Us</a></li>
              <li><a href="#" className="hover:text-background">FAQs</a></li>
              <li><a href="#" className="hover:text-background">Shipping Info</a></li>
              <li><a href="#" className="hover:text-background">Returns</a></li>
              <li><a href="#" className="hover:text-background">Assembly Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">About Forgali</a></li>
              <li><a href="#" className="hover:text-background">Warranty</a></li>
              <li><a href="#" className="hover:text-background">Safety Standards</a></li>
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
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50">
          <p>© 2024 Forgali. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
