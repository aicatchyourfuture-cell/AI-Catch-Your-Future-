import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

export function Puresar() {
  return (
    <section className="relative min-h-screen w-full flex items-center py-24">
      {/* Background Split - diagonal split */}
      <div className="absolute inset-0 z-0 split-bg-diagonal weave-texture" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            className="relative h-[70vh] w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <img 
              src="/images/texture.png" 
              alt="Woven banana fiber textile detail" 
              className="w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold p-8 flex items-center justify-center shadow-xl hidden md:flex">
              <p className="font-serif text-forest text-center leading-tight">Woven<br/>from the<br/><span className="italic">earth</span></p>
            </div>
          </motion.div>

          <motion.div
            className="text-forest lg:pl-12 bg-beige/80 p-8 lg:p-0 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-sans font-medium mb-6">Flagship Line</h2>
            <h3 className="text-5xl lg:text-7xl font-serif leading-none mb-8">Puresar.</h3>
            <p className="text-xl font-serif italic text-forest/80 mb-8">The future, naturally inherited.</p>
            <div className="space-y-6 font-sans text-forest/80 leading-relaxed">
              <p>
                Puresar is our heroic expression. A collection of heirlooms, sarees, stoles, and home textiles woven entirely from banana-fiber yarn.
              </p>
              <p>
                Every thread is a testament to unhurried perfection. Extracted from the resilient stems of the banana plant, hand-loomed by master artisans, and finished without chemical compromise. It possesses the luster of silk, the breathability of linen, and a strength uniquely its own.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
