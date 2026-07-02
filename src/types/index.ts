export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface CarRecommendationSummary {
  id: string;
  title: string;
  description: string;
}
