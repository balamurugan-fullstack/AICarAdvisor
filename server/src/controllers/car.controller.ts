import type { Request, Response } from 'express';
import { CarService } from '../services/car.service';
import type { CarsResponse } from '../types/car';

const carService = new CarService();

export const getCars = (_req: Request, res: Response<CarsResponse>) => {
  try {
    const cars = carService.getAllCars();

    res.json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      count: 0,
      data: [],
    });
  }
};
