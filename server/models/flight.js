const { Schema, model } = require("mongoose");

const flightSchema = new Schema(
  {
    airline: { type: String, required: true },
    originCity: { type: String, required: true },
    departureTime: { type: String, required: true },
    landingCity: { type: String, required: true },
    landingTime: { type: String, required: true },
    price: { type: String, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    fromAirPortCode: { type: String, required: true },
    toAirPortCode: { type: String, required: true },
    departureDate: { type: String },
    landingDate: { type: String },
    seats: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Flight", flightSchema);
