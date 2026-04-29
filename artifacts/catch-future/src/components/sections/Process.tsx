import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function Process() {
  const steps = [
    {
      title: "Extraction",
      desc: "Harvesting fibers from the pseudo-stem of post-harvest banana plants, transforming agricultural waste into wealth."
    },
    {
      title: "Spinning",
      desc: "Delicate fibers are cleansed, softened naturally, and spun into fine yarn, preserving their inherent luster."
    },
    {
      title: "Looming",
      desc: "Woven by hand on traditional wooden looms, a rhythmic meditation that honors centuries of artisanal knowledge."
    }
  ];

  return (
    <section className="relative py-32 w-full bg-beige text-forest weave-texture">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-6xl font-serif mb-6">The Alchemy of <span className="italic text-gold">Fiber</span></h2>
          <p className="font-sans text-lg max-w-2xl mx-auto opacity-80">A process entirely obedient to the rhythms of nature.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <motion.div key={step.title} variants={fadeInUp} className="flex gap-6">
                  <div className="text-gold font-serif text-3xl italic">0{idx + 1}</div>
                  <div>
                    <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                    <p className="font-sans text-forest/70 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="order-1 lg:order-2 h-[60vh]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <img src="/images/yarn.png" alt="Banana fiber yarn on handloom" className="w-full h-full object-cover rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
