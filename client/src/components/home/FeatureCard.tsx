interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10 sm:p-8">
      <div className="mb-4 h-12 w-12 rounded-3xl bg-sky-500/10 text-sky-300 ring-1 ring-white/10 flex items-center justify-center text-xl shadow-inner shadow-sky-900/10">
        ✓
      </div>
      <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-sky-300">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}
