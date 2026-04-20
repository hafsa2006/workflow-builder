import { motion } from 'framer-motion';
import { AlertCircle, Layers, Link, ZapOff } from 'lucide-react';

const problems = [
  {
    title: "Designing workflows manually",
    description: "Spending hours drawing boxes and arrows that eventually break.",
    icon: <AlertCircle className="h-6 w-6 text-coral" />,
  },
  {
    title: "Breaking tasks into steps",
    description: "Struggling to decompose complex business logic into atomic actions.",
    icon: <Layers className="h-6 w-6 text-coral" />,
  },
  {
    title: "Connecting triggers and actions",
    description: "Lost in the technical details of API connections and webhooks.",
    icon: <Link className="h-6 w-6 text-coral" />,
  },
  {
    title: "Converting ideas into execution",
    description: "The gap between 'what I want' and 'how to code it' is too wide.",
    icon: <ZapOff className="h-6 w-6 text-coral" />,
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-dark-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-sans text-4xl font-extrabold text-ivory md:text-5xl lg:text-6xl tracking-tight">
            Automation Shouldn't Be <span className="text-terracotta italic">This Hard</span>
          </h2>
          <p className="mt-6 text-lg text-warm-silver max-w-2xl mx-auto leading-relaxed">
            Current automation tools focus on the "how", but they forget about the "what". We're fixing the friction in workflow creation.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group rounded-3xl border border-white/5 bg-near-black/40 p-8 transition-all hover:bg-near-black/60 hover:border-white/10"
            >
              <div className="mb-4 inline-block rounded-xl bg-white/5 p-3 group-hover:bg-coral/10">
                {problem.icon}
              </div>
              <h3 className="font-sans text-xl font-bold text-ivory mb-2">{problem.title}</h3>
              <p className="text-sm leading-relaxed text-stone">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
