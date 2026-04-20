

const logos = ["Vercel", "OpenAI", "Stripe", "Linear", "Supabase"];

export default function SocialProof() {
  return (
    <section className="py-12 border-y border-white/5 bg-near-black/50">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-stone mb-10">
          Built for automation builders and developers at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale hover:opacity-80 transition-opacity duration-500">
           {logos.map((logo, i) => (
             <span key={i} className="font-serif text-xl font-bold text-ivory tracking-tight">{logo}</span>
           ))}
        </div>
      </div>
    </section>
  );
}
