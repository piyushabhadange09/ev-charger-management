const mongoose = require("mongoose");

const ChargingStationSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number,
  },
  status: { type: String, enum: ["Active", "Inactive"] },
  powerOutput: Number,
  connectorType: String,
});

module.exports = mongoose.model("ChargingStation", ChargingStationSchema);
// This schema defines a Charging Station with fields for name, location (latitude and longitude),
// status (active or inactive), power output, and connector type. It uses Mongoose to create a model
