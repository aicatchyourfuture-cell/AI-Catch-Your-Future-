export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 w-full bg-forest text-cream weave-texture border-t border-cream/10">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-gold">Catch Future</h2>
            <p className="font-sans text-cream/70 max-w-md leading-relaxed mb-8">
              Sovereign by craft. Sustainable by nature. The premier heritage
              house for heirloom-grade banana fiber textiles.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-sans mb-6">
              Discover
            </h3>
            <ul className="space-y-4 font-sans text-cream/70">
              <li>
                <a
                  href="#collections"
                  className="hover:text-gold transition-colors"
                >
                  Puresar Collection
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-gold transition-colors"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-gold transition-colors"
                >
                  Regenerative Impact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-sans mb-6">
              Contact
            </h3>
            <ul className="space-y-4 font-sans text-cream/70">
              <li>
                <a
                  href="#inquiry"
                  className="hover:text-gold transition-colors"
                >
                  Inquiries
                </a>
              </li>
              <li>
                <a
                  href="mailto:atelier@catchfuture.com"
                  className="hover:text-gold transition-colors"
                >
                  atelier@catchfuture.com
                </a>
              </li>
              <li>
                <a
                  href="#inquiry"
                  className="hover:text-gold transition-colors"
                >
                  Bespoke Orders
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-12 mb-12">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] font-sans text-cream/50 mb-6">
            Under the patronage of
          </p>
          <div className="flex flex-wrap items-stretch gap-6">
            <div className="flex items-center gap-4 px-6 py-4 border border-cream/15 hover:border-gold/60 transition-colors">
              <span
                aria-hidden
                className="font-serif italic text-3xl text-gold leading-none"
              >
                AHK
              </span>
              <span className="block w-px h-10 bg-cream/15" aria-hidden />
              <span className="block">
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] font-sans text-cream/50">
                  Auslandshandelskammer
                </span>
                <span className="block text-xs font-sans text-cream/80 mt-1">
                  German Chambers of Commerce Abroad
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 border border-cream/15 hover:border-gold/60 transition-colors">
              <span
                aria-hidden
                className="font-serif italic text-3xl text-gold leading-none"
              >
                GIZ
              </span>
              <span className="block w-px h-10 bg-cream/15" aria-hidden />
              <span className="block">
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] font-sans text-cream/50">
                  Deutsche Gesellschaft für
                </span>
                <span className="block text-xs font-sans text-cream/80 mt-1">
                  Internationale Zusammenarbeit
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/10 font-sans text-xs text-cream/50 uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Catch Future. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
