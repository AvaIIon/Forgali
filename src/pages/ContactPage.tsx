import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Our friendly team is here to help you find the perfect bed for your family.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Phone className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-muted-foreground">1-800-FORGALI</p>
              <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9 AM - 5 PM EST</p>
            </div>
            
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Mail className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground">support@forgali.com</p>
              <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
            </div>
            
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <Clock className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Business Hours</h3>
              <p className="text-muted-foreground">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
            </div>
            
            <div className="bg-[#f2f4f6] rounded-lg p-6">
              <MapPin className="w-8 h-8 text-[#4A647C] mb-4" />
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-muted-foreground">Serving all of Canada</p>
              <p className="text-sm text-muted-foreground mt-2">Free shipping nationwide</p>
            </div>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <button className="bg-[#4A647C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3A5066] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
