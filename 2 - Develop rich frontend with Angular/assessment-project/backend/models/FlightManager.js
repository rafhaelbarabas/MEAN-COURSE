class Flight {}

class FlightDetails {}

class FlightManager {
  companies = [
    { code: "IB", name: "Iberia", price: 10.0 },
    { code: "BA", name: "British Airways", price: 15.0 },
    { code: "LH", name: "Lufthansa", price: 7.0 },
    { code: "FR", name: "Ryanair", price: 20.0 },
    { code: "VY", name: "Vueling", price: 10.0 },
    { code: "TK", name: "Turkish Airlines", price: 5.0 },
    { code: "U2", name: "Easyjet", price: 19.9 },
  ];

  destinations = [
    { name: "Madrid", code: "MAD" },
    { name: "Barcelona", code: "BCN" },
    { name: "London", code: "LHR" },
    { name: "Paris", code: "CDG" },
    { name: "Frankfurt", code: "FRA" },
    { name: "Istanbul", code: "IST" },
    { name: "Amsterdam", code: "AMS" },
    { name: "Rome", code: "FCO" },
    { name: "Copenhagen", code: "CPH" },
  ];

  getCompanies() {
    return this.companies;
  }

  getDestinations() {
    return this.destinations;
  }
}

module.exports = FlightManager;
