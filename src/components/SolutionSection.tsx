import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Visual */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative aspect-square max-w-lg mx-auto">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-terracotta/20 blur-[100px]" />
               
               {/* Central AI Orb */}
               <motion.div 
                 animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-terracotta via-coral to-ivory p-0.5"
               >
                 <div className="w-full h-full rounded-full bg-near-black flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-terracotta shadow-lg" />
                 </div>
               </motion.div>

               {/* Orbital Nodes */}
               {[0, 1, 2, 3].map((i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     rotate: [0, 360],
                   }}
                   transition={{ 
                     duration: 15, 
                     repeat: Infinity, 
                     ease: "linear",
                     delay: i * 2
                   }}
                   className="absolute inset-0"
                 >
                   <motion.div 
                     className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md"
                     style={{ marginTop: i * 20 }}
                   >
                     <div className="h-3 w-3 bg-terracotta rounded-full shadow-[0_0_10px_rgba(201,100,66,0.8)]" />
                   </motion.div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" /> The Solution
              </div>
              <h2 className="font-sans text-4xl font-extrabold text-ivory md:text-5xl lg:text-5xl mb-8 tracking-tight leading-[1.1]">
                AI That Builds Your <br />
                <span className="text-terracotta italic">Workflow</span>
              </h2>
              <p className="text-lg text-warm-silver leading-relaxed mb-8">
                Stop worrying about the technical "how". Describe your automation in plain English and our AI builds the logical structure, maps the nodes, and generates the execution code for you.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Semantic understanding of complex instructions",
                  "Automated trigger-to-action node mapping",
                  "Built-in logic validation and error handling",
                  "Instant export to major automation platforms"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ivory">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terracotta shadow-lg" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                 <button className="group flex items-center gap-2 text-terracotta font-semibold hover:gap-4 transition-all">
                    Explore our Reasoning Engine <ArrowRight className="h-5 w-5" />
                 </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
