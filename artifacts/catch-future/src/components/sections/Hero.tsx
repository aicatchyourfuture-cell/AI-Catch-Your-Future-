import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-20">
      {/* Background Split - vertical split for hero */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 h-full bg-beige" />
        <div className="w-1/2 h-full bg-forest" />
      </div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 z-0 weave-texture mix-blend-overlay opacity-50" />

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side - Beige Background */}
          <div className="text-forest py-12 lg:py-0">
            <motion.h2 variants={fadeInUp} className="text-sm uppercase tracking-[0.2em] mb-6 font-sans font-medium text-forest/70">
              Catch Future
            </motion.h2>
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-serif leading-tight mb-8">
              Sovereign by craft.<br />
              <span className="italic text-gold">Sustainable</span> by nature.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg font-sans leading-relaxed max-w-md text-forest/80 mb-10">
              A quietly confident heritage house from India. Rooted in regenerative agriculture, realized through uncompromised luxury.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="#collections" className="inline-flex items-center gap-4 group">
                <span className="font-sans text-sm uppercase tracking-widest font-medium border-b border-forest pb-1 group-hover:border-gold transition-colors duration-300">Discover Puresar</span>
              </a>
            </motion.div>
          </div>

          {/* Right Side - Forest Background */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-forest/20 mix-blend-multiply z-10" />
            <motion.img 
              variants={fadeInUp}
              src="/images/hero.png" 
              alt="Puresar banana fiber saree draped in natural light" 
              className="w-full h-[120%] object-cover object-center absolute"
              style={{ top: "-10%" }}
            />
            <div className="absolute bottom-8 right-8 z-20 text-cream text-right">
              <p className="font-serif italic text-xl">Puresar</p>
              <p className="font-sans text-xs uppercase tracking-widest opacity-70">Flagship Collection</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
