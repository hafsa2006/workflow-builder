import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24 md:py-48 relative overflow-hidden">
      {/* Background Animation: Floating Nodes */}
      <div className="absolute inset-0 -z-10 bg-near-black">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.3 + 0.1,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: ["-20px", "20px", "-20px"],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute h-2 w-2 rounded-full bg-terracotta/40 blur-sm"
          />
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-sans text-5xl font-extrabold text-ivory md:text-7xl mb-8 leading-[1.05] tracking-tight">
            Ready to Automate Your <br />
            <span className="text-terracotta italic glow-text-terracotta">Dreams?</span>
          </h2>
          <p className="text-xl text-warm-silver mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the community of developers and builders who are redefining automation logic with AI. Start generating your first workflow today.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/app">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl bg-terracotta text-ivory font-bold text-lg shadow-2xl glow-terracotta hover:bg-coral transition-colors flex items-center gap-3"
              >
                Generate Workflow <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>

          </div>
        </motion.div>
      </div>
      
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-terracotta/5 to-transparent pointer-events-none" />
    </section>
  );
}
