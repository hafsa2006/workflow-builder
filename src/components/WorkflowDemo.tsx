import { motion } from 'framer-motion';
import { Zap, Play, CheckCircle2, FileJson } from 'lucide-react';

export default function WorkflowDemo() {
  return (
    <section id="demo" className="py-24 md:py-32 bg-dark-surface/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-ivory md:text-5xl mb-6">Watch AI Build <span className="italic text-coral">Workflows</span></h2>
          <p className="text-warm-silver max-w-2xl mx-auto">See the magic happen. From a single prompt to a fully mapped executable flow in real-time.</p>
        </div>

        <div className="relative mx-auto max-w-4xl p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl">
          <div className="bg-near-black rounded-[2.4rem] p-8 md:p-12">
            <div className="flex flex-col gap-12 relative">
              {/* Animated Connector Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 200 80 Q 400 80 400 200" fill="none" stroke="rgba(201,100,66,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 400 280 Q 400 400 600 400" fill="none" stroke="rgba(201,100,66,0.2)" strokeWidth="2" strokeDasharray="5,5" />
              </svg>

              {/* Node: Trigger */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="self-start relative z-10 w-full max-w-[280px]"
              >
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl hover:border-terracotta/50 transition-colors cursor-default shadow-lg group">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-stone mb-0.5">Trigger</div>
                    <div className="font-serif text-white">Form Submitted</div>
                  </div>
                </div>
              </motion.div>

              {/* Node: Process */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="self-center relative z-10 w-full max-w-[320px]"
              >
                <div className="flex items-center gap-4 p-6 rounded-[2rem] border border-terracotta/30 bg-terracotta/5 backdrop-blur-2xl shadow-xl glow-terracotta group">
                  <div className="h-12 w-12 rounded-full bg-terracotta flex items-center justify-center text-ivory animate-spin-slow">
                    <Play className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-stone mb-0.5">AI Engine</div>
                    <div className="font-serif text-white text-lg">Reasoning & Mapping</div>
                  </div>
                   <div className="ml-auto flex gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '0.4s' }} />
                   </div>
                </div>
              </motion.div>

              {/* Node: Action -> JSON */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                 <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="w-full max-w-[280px]"
                  >
                    <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-lg">
                      <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-stone mb-0.5">Action</div>
                        <div className="font-serif text-white">Send Email Notification</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="w-full max-w-[280px]"
                  >
                    <div className="flex items-center gap-4 p-5 rounded-2xl border border-terracotta/50 bg-terracotta/20 backdrop-blur-xl shadow-lg glow-terracotta">
                      <div className="h-10 w-10 rounded-xl bg-terracotta flex items-center justify-center text-white">
                        <FileJson className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Output</div>
                        <div className="font-serif text-white font-semibold italic">flow.json</div>
                      </div>
                    </div>
                  </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
