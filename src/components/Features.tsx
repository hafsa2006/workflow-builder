import { motion } from 'framer-motion';
import { BrainCircuit, Workflow, Map, Code, Rocket, Zap } from 'lucide-react';

const features = [
  {
    title: "Natural Language Understanding",
    desc: "Speak to your builder like a human. It understands intent, context, and nuance.",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
  {
    title: "Workflow Reasoning",
    desc: "AI doesn't just map keywords; it thinks through the logic of your automation.",
    icon: <Workflow className="h-6 w-6" />,
  },
  {
    title: "Automatic Node Mapping",
    desc: "Instantly identifies the right triggers and actions from your instructions.",
    icon: <Map className="h-6 w-6" />,
  },
  {
    title: "Executable JSON Generation",
    desc: "Clean, minified, and schema-compliant JSON ready for deployment.",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Automation Platform Ready",
    desc: "Optimized for Zapier, Make, n8n, and custom internal systems.",
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    title: "Instant Workflow Creation",
    desc: "From zero to executable in under 3 seconds. Speed is our superpower.",
    icon: <Zap className="h-6 w-6" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-sans text-4xl font-extrabold text-ivory md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Powerful Features for <br />
              <span className="text-terracotta italic">Modern Builders</span>
            </h2>
          </div>
          <p className="text-warm-silver md:max-w-xs">
            Everything you need to turn complex ideas into seamless automations without a single line of manual code.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 rounded-[2rem] border border-white/5 bg-near-black/50 hover:bg-near-black hover:border-terracotta/30 transition-all shadow-xl"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-terracotta/20 group-hover:text-terracotta transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-sans text-2xl font-bold text-ivory mb-3">{feature.title}</h3>
              <p className="text-stone leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
