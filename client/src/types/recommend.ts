export interface RecommendItem {
  id: number;
  make: string;
  model: string;
  variant: string;
  price: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  mileage?: number;
  safety?: number;
  seatingCapacity?: number;
  image?: string;
  score?: number;
  reasons?: string[];
}

export interface RecommendResponse {
  success: boolean;
  count: number;
  data: RecommendItem[];
}

export interface RecommendRequest {
  budget: number;
  fuel?: string;
  transmission?: string;
  bodyType?: string;
  seatingCapacity?: number;
  priority?: string;
}
