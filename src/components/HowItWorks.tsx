import { motion } from 'framer-motion';
import { MessageSquare, Cpu, GitBranch, Code2 } from 'lucide-react';

const steps = [
  {
    title: "Describe automation",
    desc: "Tell the AI what you want to achieve in plain English.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "AI analyzes request",
    desc: "Our engine decomposes your intent into logic blocks.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Workflow structure created",
    desc: "Nodes are mapped with correct triggers and sequences.",
    icon: <GitBranch className="h-6 w-6" />,
  },
  {
    title: "Executable JSON generated",
    desc: "Get ready-to-run JSON for your favorite platform.",
    icon: <Code2 className="h-6 w-6" />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-near-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <h2 className="font-sans text-4xl font-extrabold text-ivory md:text-5xl lg:text-6xl tracking-tight">
            Simple 4-Step <span className="text-terracotta italic">Process</span>
          </h2>
          <p className="mt-6 text-lg text-warm-silver max-w-2xl mx-auto">From idea to execution in seconds.</p>
        </div>

        <div className="relative">
          {/* Vertical line for mobile */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-ml-px" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-6 -ml-3 h-6 w-6 rounded-full border-4 border-near-black bg-terracotta md:left-1/2 md:-ml-3 shadow-[0_0_15px_rgba(201,100,66,0.5)] z-10" />

                <div className="ml-12 md:ml-0 md:w-[45%]">
                  <div className={`p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-white/10 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta shadow-lg ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                      <div className="text-ivory">{step.icon}</div>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-ivory mb-2">{step.title}</h3>
                    <p className="text-warm-silver">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
