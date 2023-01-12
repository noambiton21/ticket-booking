const express = require("express");

const flightsController = require("../controllers/flights-controller");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/flights", flightsController.getAllFlights);

router.use(checkAuth);

router.post("/addFlight", flightsController.addFlight);

router.put("/updateSeats", flightsController.updateSeats);

router.delete("/deleteFlight", flightsController.deleteFlight);

module.exports = router;
