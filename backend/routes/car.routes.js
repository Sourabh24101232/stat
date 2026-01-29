const express = require("express");
const router = express.Router();


const {getCars,addCar,deleteCar} = require("../controllers/car.controller");
router.get("/", getCars);
router.post("/", addCar);
router.delete("/:id", deleteCar);


module.exports = router;

