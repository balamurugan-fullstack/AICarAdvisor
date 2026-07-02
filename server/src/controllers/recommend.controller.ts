import type { Request, Response } from 'express';
import { RecommendService } from '../services/recommend.service';
import type { RecommendResponse } from '../types/recommend';

const service = new RecommendService();

export const postRecommend = async (req: Request, res: Response<RecommendResponse>) => {
  try {
    const body = req.body;

    // Basic validation
    if (!body || typeof body.budget !== 'number') {
      return res.status(400).json({ success: false, count: 0, data: [] });
    }

    const results = service.recommend(body);

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    console.error('recommend error', error);
    res.status(500).json({ success: false, count: 0, data: [] });
  }
};
