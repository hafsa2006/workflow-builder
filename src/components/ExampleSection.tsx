import { motion } from 'framer-motion';
import { Copy, Terminal as TerminalIcon } from 'lucide-react';

export default function ExampleSection() {
  const jsonCode = `{
  "id": "wf_829104",
  "name": "Form to Email Notification",
  "trigger": {
    "type": "form_submission",
    "source": "Marketing Contact Form"
  },
  "actions": [
    {
      "id": "action_1",
      "type": "email_send",
      "params": {
        "to": "{{form_response.email}}",
        "subject": "Thank you for reaching out!",
        "template": "welcome_auto_reply"
      }
    },
    {
      "id": "action_2",
      "type": "slack_notify",
      "params": {
        "channel": "#leads",
        "message": "New lead from {{form_response.name}}"
      }
    }
  ]
}`;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Input Example */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans text-4xl font-extrabold text-ivory md:text-5xl lg:text-6xl mb-8 tracking-tight leading-tight">
              From Thought to <br />
              <span className="text-terracotta italic">Schema</span>
            </h2>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-terracotta" />
               <div className="text-stone text-xs uppercase tracking-widest mb-4">Input Prompt</div>
               <p className="font-serif text-2xl text-ivory italic leading-relaxed">
                "Whenever someone fills out the contact form, send them a thank you email and notify the sales team on Slack."
               </p>
               <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-green-500" />
                     <span className="text-sm text-stone italic">NLU Processing Complete</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Side: Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-black/60 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-4 w-4 text-stone" />
                  <span className="text-stone text-xs">workflow_gen.json</span>
                </div>
                <button className="text-stone hover:text-ivory transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 overflow-x-auto text-[#e2e8f0]">
                <pre className="whitespace-pre">
                  {jsonCode.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-stone/40 select-none">{i + 1}</span>
                      <span>
                        {line.split(/(["'].*?["']|[:{},[\]])/).map((part, j) => {
                          if (part.startsWith('"') || part.startsWith("'")) return <span key={j} className="text-orange-300">{part}</span>;
                          if ([':', '{', '}', '[', ']'].includes(part)) return <span key={j} className="text-stone">{part}</span>;
                          return <span key={j}>{part}</span>;
                        })}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-terracotta/5 blur-2xl -z-10 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
