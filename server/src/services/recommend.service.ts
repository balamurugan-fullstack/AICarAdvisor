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
    // Feature 5: weighted scoring
    // Weights (total 100): Budget 30, Fuel 20, Transmission 20, Mileage 15, Safety 15
    const WEIGHTS = {
      budget: 30,
      fuel: 20,
      transmission: 20,
      mileage: 15,
      safety: 15,
    };

    // Precompute mileage min/max for normalization
    const mileages = cars.map((c) => Number((c as any).mileage || 0)).filter((m) => m > 0);
    const minMileage = mileages.length ? Math.min(...mileages) : 0;
    const maxMileage = mileages.length ? Math.max(...mileages) : 0;

    const scored = cars.map((c) => {
      let score = 0;
      const reasons: string[] = [];

      // Budget: full weight if within budget
      if (request.budget && c.price <= request.budget) {
        score += WEIGHTS.budget;
        reasons.push('Within budget');
      }

      // Fuel
      if (request.fuel && c.fuel && c.fuel.toLowerCase() === request.fuel.toLowerCase()) {
        score += WEIGHTS.fuel;
        reasons.push(`Matches fuel: ${c.fuel}`);
      }

      // Transmission
      if (request.transmission && c.transmission && c.transmission.toLowerCase() === request.transmission.toLowerCase()) {
        score += WEIGHTS.transmission;
        reasons.push(`Matches transmission: ${c.transmission}`);
      }

      // Mileage: normalize between min/max; higher is better
      const carMileage = Number((c as any).mileage || 0);
      if (carMileage > 0 && maxMileage > minMileage) {
        const normalized = (carMileage - minMileage) / (maxMileage - minMileage);
        const mileageScore = normalized * WEIGHTS.mileage;
        score += mileageScore;
        if (mileageScore > WEIGHTS.mileage * 0.5) {
          reasons.push(`Good mileage: ${carMileage} kmpl`);
        }
      }

      // Safety: assume 1-5 scale
      const safety = Number((c as any).safety || 0);
      if (safety > 0) {
        const safetyNormalized = (safety - 1) / 4; // 0..1
        const safetyScore = safetyNormalized * WEIGHTS.safety;
        score += safetyScore;
        if (safety >= 4) {
          reasons.push(`Strong safety rating: ${safety}/5`);
        }
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
        seatingCapacity: (c as any).seats,
        image: c.image,
        score: Math.round((score + Number.EPSILON) * 10) / 10,
        reasons,
      };

      return item;
    });

    // Sort by descending score, then by price ascending
    scored.sort((a, b) => (b.score || 0) - (a.score || 0) || a.price - b.price);

    return scored.slice(0, 3);
  }
}
