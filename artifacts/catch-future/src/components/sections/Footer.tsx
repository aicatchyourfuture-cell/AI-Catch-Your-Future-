import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-24 w-full bg-forest text-cream weave-texture border-t border-cream/10">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-gold">Catch Future</h2>
            <p className="font-sans text-cream/70 max-w-md leading-relaxed mb-8">
              Sovereign by craft. Sustainable by nature. The premier heritage house for heirloom-grade banana fiber textiles.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-widest font-sans mb-6">Discover</h3>
            <ul className="space-y-4 font-sans text-cream/70">
              <li><a href="#" className="hover:text-gold transition-colors">Puresar Collection</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Regenerative Impact</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Journal</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-sans mb-6">Contact</h3>
            <ul className="space-y-4 font-sans text-cream/70">
              <li><a href="#" className="hover:text-gold transition-colors">Inquiries</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Bespoke Orders</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/10 font-sans text-xs text-cream/50 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Catch Future. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
