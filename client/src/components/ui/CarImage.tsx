import { useEffect, useState } from 'react';

interface CarImageProps {
  image?: string;
  make: string;
  model: string;
}

const FALLBACK_SRC =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" rx="40" fill="url(#bg)" />
      <path d="M120 220c60-80 240-80 300 0" fill="none" stroke="#475569" stroke-width="28" stroke-linecap="round" />
      <circle cx="170" cy="240" r="24" fill="#334155" />
      <circle cx="430" cy="240" r="24" fill="#334155" />
      <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="32" fill="#cbd5e1">No car image</text>
      <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" fill="#94a3b8">Try another recommendation</text>
    </svg>
  `);

export function CarImage({ image, make, model }: CarImageProps) {
  const [src, setSrc] = useState(image || FALLBACK_SRC);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSrc(image || FALLBACK_SRC);
    setLoading(true);
  }, [image]);

  const handleLoad = () => setLoading(false);

  const handleError = () => {
    if (src !== FALLBACK_SRC) {
      setSrc(FALLBACK_SRC);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/70">
      {loading && (
        <div className="absolute inset-0 animate-pulse rounded-[1.75rem] bg-slate-800/90" />
      )}
      <img
        src={src}
        alt={`${make} ${model}`}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className="h-72 w-full object-cover transition duration-300"
      />
    </div>
  );
}
