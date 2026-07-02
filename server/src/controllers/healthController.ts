import type { Request, Response } from 'express';

export interface HealthResponse {
  success: boolean;
  message: string;
}

export const getHealth = (_req: Request, res: Response<HealthResponse>) => {
  res.json({
    success: true,
    message: 'Server is running',
  });
};
