import path from 'path';
import fs from 'fs';
import type { RecommendRequest, RecommendItem } from '../types/recommend';
import type { Car } from '../types/car';

export class RecommendService {
  recommend(request: RecommendRequest): RecommendItem[] {
    const filePath = path.join(__dirname, '..', 'data', 'cars.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const cars = JSON.parse(raw) as Car[];

    // Simple matching algorithm for MVP (Feature 4):
    // score by counting matching attributes and budget fit.
    const scored = cars.map((c) => {
      let score = 0;
      const reasons: string[] = [];

      if (request.budget && c.price <= request.budget) {
        score += 1;
        reasons.push('Within budget');
      }

      if (request.fuel && c.fuel.toLowerCase() === request.fuel.toLowerCase()) {
        score += 1;
        reasons.push(`Fuel: ${c.fuel}`);
      }

      if (request.transmission && c.transmission.toLowerCase() === request.transmission.toLowerCase()) {
        score += 1;
        reasons.push(`Transmission: ${c.transmission}`);
      }

      if (request.bodyType && c.bodyType.toLowerCase() === request.bodyType.toLowerCase()) {
        score += 1;
        reasons.push(`Body type: ${c.bodyType}`);
      }

      if (request.seatingCapacity && Number(c.seats || 0) >= request.seatingCapacity) {
        score += 1;
        reasons.push(`Seats: ${c.seats}`);
      }

      const item: RecommendItem = {
        id: c.id,
        make: c.make,
        model: c.model,
        variant: c.variant,
        price: c.price,
        fuel: c.fuel,
        transmission: c.transmission,
        bodyType: c.bodyType,
        mileage: (c as any).mileage,
        safety: (c as any).safety,
        seatingCapacity: (c as any).seats || (c as any).seatingCapacity,
        image: c.image,
        score,
        reasons,
      };

      return item;
    });

    // Sort by descending score, then by price ascending
    scored.sort((a, b) => (b.score || 0) - (a.score || 0) || a.price - b.price);

    return scored.slice(0, 3);
  }
}
