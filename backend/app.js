// CRUD---------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware--------------------------------------------------------
app.use(cors());//It allows your frontend (browser) to talk to your backend when they run on different origins. Frontend → http://localhost:5173 and Backend → http://localhost:5000 .Browsers block such requests by default for security reasons.
app.use(express.json());//parses request body means It reads the raw data sent by the client and converts it into a usable JavaScript object.Without parsing, the server cannot understand what the client sent.

const carRoutes = require("./routes/car.routes");
app.use("/cars", carRoutes);// /cars tells Express: “Send this request to car.routes.js
//-------------------------------------------------------------------

//Error handling----------------------------------------------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const { errorHandler } = require("./middlewares/error.middleware");
app.use(errorHandler);//handle errors
//-------------------------------------------------------------------

// MongoDB connection------------------------------------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));
//-------------------------------------------------------------------

// Server start------------------------------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//-------------------------------------------------------------------
