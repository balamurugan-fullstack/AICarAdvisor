import api from './api';
import type { RecommendRequest, RecommendResponse } from '../types/recommend';

export async function getRecommendations(request: RecommendRequest): Promise<RecommendResponse> {
  const response = await api.post<RecommendResponse>('/recommend', request);
  return response.data;
}
