import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function Introduction() {
  return (
    <section className="relative py-32 lg:py-48 w-full bg-forest text-cream weave-texture overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-sans text-gold mb-12">The Parent Identity</h2>
            <p className="text-3xl lg:text-5xl font-serif leading-snug lg:leading-tight">
              Catch Future exists to reclaim sovereign heritage. We operate at the rare intersection of <span className="text-gold italic">regenerative agriculture</span>, ancient fiber-craft, and modern luxury goods.
            </p>
            <p className="mt-12 text-lg font-sans text-cream/70 max-w-2xl mx-auto leading-relaxed">
              We do not merely sustain; we regenerate. Our foundation is built upon the earth's natural resilience, crafting heirlooms that outlast generations while enriching the soil they stem from. Unhurried, deliberate, and fiercely rooted.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
