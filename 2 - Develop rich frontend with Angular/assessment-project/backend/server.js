const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// const Flight = require("./models/Flight");
// const FlightDetails = require("./models/FlightDetails");
const FlightManager = require("./models/FlightManager");
// const Booking = require("./models/Booking");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const flightManager = new FlightManager();

app.get("/companies", (req, res) => {
  const companies = flightManager.getCompanies();
  res.status(200).json(companies);
});

app.get("/destinations", (req, res) => {
  const destinations = flightManager.getDestinations();
  res.status(200).json(destinations);
});

// Endpoint to provide flight source and destination data
app.get("/flights", (req, res) => {
  console.log("flights");

  res.json({});
});

// POST endpoint to handle user input
app.post("/flights", (req, res) => {
  res.status(200).json({ totalPrice: 0 });
});

app.post("/createBooking", (req, res) => {
  // Load existing data from the file, if any
  let existingData = [];
  try {
    const data = fs.readFileSync("data.json");
    existingData = JSON.parse(data);
  } catch (err) {
    // File doesn't exist or couldn't be read; an empty array will be used
  }

  // logic goes here

  // Push the new data into the existing array
  existingData.push(req.body);

  // Write the updated data back to the file
  fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));

  res.send({ message: "Booking created successfully!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
