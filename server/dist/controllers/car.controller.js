"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCars = void 0;
const car_service_1 = require("../services/car.service");
const carService = new car_service_1.CarService();
const getCars = (_req, res) => {
    try {
        const cars = carService.getAllCars();
        res.json({
            success: true,
            count: cars.length,
            data: cars,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            count: 0,
            data: [],
        });
    }
};
exports.getCars = getCars;
