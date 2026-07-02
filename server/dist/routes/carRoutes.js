"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const router = (0, express_1.Router)();
router.get('/cars', car_controller_1.getCars);
exports.default = router;
