"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CarService {
    getAllCars() {
        const filePath = path_1.default.join(__dirname, '..', 'data', 'cars.json');
        const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(rawData);
        if (!Array.isArray(parsedData)) {
            throw new Error('Invalid car dataset format.');
        }
        return parsedData;
    }
}
exports.CarService = CarService;
