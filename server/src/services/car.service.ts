import fs from 'fs';
import path from 'path';
import type { Car } from '../types/car';

export class CarService {
  getAllCars(): Car[] {
    const filePath = path.join(__dirname, '..', 'data', 'cars.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(rawData) as Car[];

    if (!Array.isArray(parsedData)) {
      throw new Error('Invalid car dataset format.');
    }

    return parsedData;
  }
}
