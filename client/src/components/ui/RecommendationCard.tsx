import { CarImage } from './CarImage';
import type { RecommendItem } from '../../types/recommend';

interface RecommendationCardProps {
  item: RecommendItem;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  return (
    <article className="rounded-3xl border border-slate-700 bg-slate-900/80 p-0 shadow-xl shadow-slate-950/20">
      <CarImage image={item.image} make={item.make} model={item.model} />

      <div className="space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400">{item.bodyType}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{item.make} {item.model}</h3>
            <p className="text-sm text-slate-400">{item.variant}</p>
          </div>
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100">Score {item.score?.toFixed(1) ?? 'N/A'}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="text-slate-200 font-semibold">Price</p>
            <p>₹{item.price.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="text-slate-200 font-semibold">Fuel</p>
            <p>{item.fuel}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="text-slate-200 font-semibold">Transmission</p>
            <p>{item.transmission}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="text-slate-200 font-semibold">Mileage</p>
            <p>{item.mileage ? `${item.mileage} kmpl` : 'N/A'}</p>
          </div>
        </div>

        <div className="text-sm text-slate-300">
          <p className="font-semibold text-white">Why this car?</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            {item.reasons?.length
              ? item.reasons.map((reason) => <li key={reason}>{reason}</li>)
              : <li>No recommendation details available.</li>}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full bg-slate-950/80 px-3 py-1">Seats {item.seatingCapacity ?? 'N/A'}</span>
          <span className="rounded-full bg-slate-950/80 px-3 py-1">{item.bodyType}</span>
        </div>
      </div>
    </article>
  );
}
