import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Collections() {
  const products = [
    {
      name: "The Sovereign Saree",
      image: "/images/hero.png",
      desc: "Our signature drape. Six yards of uncompromised elegance."
    },
    {
      name: "Heirloom Stoles",
      image: "/images/fabric-drape.png",
      desc: "Weightless warmth. The texture of raw earth, refined."
    },
    {
      name: "Home Textiles",
      image: "/images/product-flatlay.png",
      desc: "Quiet luxury for sovereign living spaces."
    }
  ];

  return (
    <section id="collections" className="relative py-32 w-full bg-forest text-cream weave-texture">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-[0.2em] font-sans text-gold mb-4">Collections</h2>
            <h3 className="text-4xl lg:text-6xl font-serif">Made for <span className="italic">sovereigns.</span></h3>
          </div>
          <button className="font-sans text-sm uppercase tracking-widest font-medium border-b border-cream/30 pb-1 hover:border-gold transition-colors duration-300">
            View Full Lookbook
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={fadeInUp} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 h-[60vh] relative">
                <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h4 className="text-2xl font-serif mb-2 group-hover:text-gold transition-colors duration-300">{product.name}</h4>
              <p className="font-sans text-cream/60">{product.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
