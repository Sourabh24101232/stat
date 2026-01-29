const Car = require("../models/carModel");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// GET all cars
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  res.status(200).json(cars);
});

// ADD a car
const addCar = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.pricePerDay) {
    throw new AppError("Name and price are required", 400);
  }

  const car = await Car.create(req.body);
  res.status(201).json(car);
});

// DELETE a car
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  res.status(200).json({ message: "Car deleted" });
});

module.exports = { getCars, addCar, deleteCar, };
