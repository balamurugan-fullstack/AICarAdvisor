import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30 backdrop-blur ${className}`.trim()}>
      {title ? <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2> : null}
      {description ? <p className="mb-4 text-sm leading-6 text-slate-400">{description}</p> : null}
      {children}
    </section>
  );
}
