// Schema = blueprint
// Model = actual machine that talks to DB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
    {
        name: { type: String, required: true, },
        number: { type: String, required: true, unique: true, },
        pricePerDay: { type: Number, required: true, },
        isActive: { type: Boolean, default: true, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
//Industry convention is singular, capitalized model names:
