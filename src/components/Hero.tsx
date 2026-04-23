import { motion } from 'framer-motion';
import { ArrowRight, ScanText, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="mesh-gradient absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl w-full px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center rounded-full bg-white/5 border border-white/10 px-3 py-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/80">AI Technology</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-ivory md:text-5xl lg:text-6xl">
              Where English Meets{' '}
              <span className="text-terracotta italic glow-text-terracotta">
                Advanced Logic
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base leading-relaxed text-warm-silver md:text-lg max-w-md">
              We invest in the best AI models so your automation workflows are faster, more accurate, and more scalable than ever before.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/app">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 rounded-xl bg-terracotta px-6 py-3 text-base font-semibold text-ivory shadow-lg glow-terracotta"
                >
                  Generate Workflow <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>

            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-terracotta">
                  <ScanText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ivory leading-snug">Natural Language Scanner</h3>
                  <p className="text-xs text-stone mt-0.5 leading-snug">Converts prompts into logic with zero config.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-terracotta">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ivory leading-snug">Workflow JSON Export</h3>
                  <p className="text-xs text-stone mt-0.5 leading-snug">Ready-to-use JSON for all major tools.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-near-black/60 p-8 backdrop-blur-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Input */}
                <div className="rounded-xl border border-white/10 bg-dark-surface p-5">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-terracotta mb-2">Input Stream</div>
                  <div className="font-sans text-base text-ivory font-medium leading-relaxed">
                    "Sync all my Stripe customers to Salesforce whenever a payment succeeds"
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center relative h-10 -my-3">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-[2px] bg-gradient-to-b from-terracotta via-coral to-transparent"
                  />
                </div>

                {/* AI Engine */}
                <div className="flex items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-terracotta/10 to-transparent animate-pulse" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="h-12 w-12 rounded-full bg-terracotta flex items-center justify-center shadow-[0_0_30px_rgba(202,96,73,0.4)]">
                      <Zap className="h-6 w-6 text-ivory fill-ivory" />
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-warm-silver">Engine Processing...</div>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center relative h-10 -my-3">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                    className="w-[2px] bg-gradient-to-b from-coral to-transparent"
                  />
                </div>

                {/* Output Nodes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                    <div className="text-[10px] text-stone uppercase font-bold mb-1 tracking-wider">Trigger</div>
                    <div className="text-sm text-ivory font-semibold">Stripe Payment</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                    <div className="text-[10px] text-stone uppercase font-bold mb-1 tracking-wider">Action</div>
                    <div className="text-sm text-ivory font-semibold">Salesforce Sync</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-terracotta/10 blur-[80px] pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
