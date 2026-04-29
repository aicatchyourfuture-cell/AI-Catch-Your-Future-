import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function Impact() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Split background for impact section */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="w-full lg:w-1/2 bg-beige weave-texture p-12 lg:p-24 flex flex-col justify-center text-forest">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-sans font-medium mb-6">Regenerated Roots</h2>
            <h3 className="text-4xl lg:text-5xl font-serif leading-tight mb-8">
              We return more to the earth than we extract.
            </h3>
            <p className="font-sans text-lg opacity-80 leading-relaxed mb-8">
              Our banana fiber is sourced from regenerative farms where biodiversity is championed over monoculture. Every yard woven contributes to the vitality of the soil and the sovereignty of the farmers.
            </p>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto">
          <img src="/images/farm.png" alt="Regenerative banana farm" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row min-h-[80vh]">
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto">
          <img src="/images/artisan.png" alt="Artisan weaving" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-1/2 bg-forest weave-texture p-12 lg:p-24 flex flex-col justify-center text-cream">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-sans font-medium text-gold mb-6">The Craft</h2>
            <h3 className="text-4xl lg:text-5xl font-serif leading-tight mb-8">
              A lineage preserved in every weft.
            </h3>
            <p className="font-sans text-lg opacity-80 leading-relaxed mb-8">
              Our artisans are not just weavers; they are custodians of a fading language. Catch Future ensures sovereign wages, dignified conditions, and the uninterrupted transmission of generational craft.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
