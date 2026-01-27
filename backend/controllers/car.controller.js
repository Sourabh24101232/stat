const Car = require("../models/carModel");

// GET all cars
const getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

// ADD a car
const addCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.json(car);
};

// DELETE a car
const deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
};

module.exports = { getCars, addCar,deleteCar};
