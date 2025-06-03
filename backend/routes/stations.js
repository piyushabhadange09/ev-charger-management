// const express = require("express");
// const router = express.Router();
// const ChargingStation = require("../models/ChargingStation");
// const auth = require("../middleware/auth");

// router.get("/", auth, async (req, res) =>
//   res.json(await ChargingStation.find())
// );
// router.post("/", auth, async (req, res) =>
//   res.json(await ChargingStation.create(req.body))
// );
// router.put("/:id", auth, async (req, res) =>
//   res.json(
//     await ChargingStation.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//   )
// );
// router.delete("/:id", auth, async (req, res) =>
//   res.json(await ChargingStation.findByIdAndDelete(req.params.id))
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const Station = require("../models/Station");

// GET all stations
router.get("/", async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

// ✅ GET station by ID
router.get("/:id", async (req, res) => {
  console.log("Fetching station with ID:", req.params.id); // ✅ Should log
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new station
router.post("/", async (req, res) => {
  const newStation = new Station(req.body);
  await newStation.save();
  res.status(201).json(newStation);
});

// PUT update station
router.put("/:id", async (req, res) => {
  await Station.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Station updated" });
});

// DELETE station
router.delete("/:id", async (req, res) => {
  await Station.findByIdAndDelete(req.params.id);
  res.json({ message: "Station deleted" });
});

module.exports = router;
