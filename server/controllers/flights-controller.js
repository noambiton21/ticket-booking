const Flight = require("../models/flight");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

const addFlight = async (req, res, next) => {
  const {
    airline,
    originCity,
    departureTime,
    departureDate,
    landingCity,
    landingTime,
    landingDate,
    price,
    fromAirPortCode,
    toAirPortCode,
  } = req.body;

  let flightDate = new Date(departureDate);
  flightDate = flightDate.toLocaleDateString("en-GB");

  let flightLandingDate = new Date(landingDate);
  flightLandingDate = flightLandingDate.toLocaleDateString("en-GB");

  try {
    let existFlight = await Flight.findOne({
      airline: airline,
      departureDate: flightDate,
      departureTime: departureTime,
      originCity: originCity,
      landingCity: landingCity,
    });

    if (!existFlight) {
      const createdFlight = new Flight({
        airline,
        originCity,
        departureTime,
        departureDate: flightDate,
        landingCity,
        landingTime,
        landingDate: flightLandingDate,
        fromAirPortCode,
        toAirPortCode,
        price,
        rows: 6,
        cols: 6,
        seats: {
          A: [0, 0, 0, 0, 0, 0],
          B: [0, 0, 0, 0, 0, 0],
          C: [0, 0, 0, 0, 0, 0],
          D: [0, 0, 0, 0, 0, 0],
          E: [0, 0, 0, 0, 0, 0],
          F: [0, 0, 0, 0, 0, 0],
          G: [0, 0, 0, 0, 0, 0],
        },
      });
      await createdFlight.save();
      res.status(201).json(createdFlight);
    }
  } catch (ex) {
    next(ex);
  }
};

const getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find({});
    res.json(flights);
  } catch (ex) {
    next(ex);
  }
};

const updateSeats = async (req, res, next) => {
  try {
    let user = await User.findById(req.userData.userId);
    console.log(user);
    if (user) {
      const { seats, flightId } = req.body;

      let existingFlight = await Flight.findById(flightId);
      console.log(existingFlight);
      await existingFlight.updateOne({ seats });
      res.json("ok");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (ex) {
    next(ex);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    let user = await User.findById(req.userData.userId);
    if (user) {
      const { flightId } = req.body;

      await Flight.deleteOne({ _id: ObjectId(flightId) });
      res.json("ok");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (ex) {
    next(ex);
  }
};

exports.addFlight = addFlight;
exports.getAllFlights = getAllFlights;
exports.updateSeats = updateSeats;
exports.deleteFlight = deleteFlight;
