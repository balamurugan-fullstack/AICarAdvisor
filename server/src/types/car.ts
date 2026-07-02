export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  price: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  seats: number;
  mileage: number;
  engine: string;
  power: number;
  safety: number;
  bootSpace: number;
  groundClearance: number;
  rating: number;
  image: string;
}

export interface CarsResponse {
  success: boolean;
  count: number;
  data: Car[];
}
