const { parse } = require("path");

const companies = [
  { code: "IB", name: "Iberia", price: 10.0 },
  { code: "BA", name: "British Airways", price: 15.0 },
  { code: "LH", name: "Lufthansa", price: 7.0 },
  { code: "FR", name: "Ryanair", price: 20.0 },
  { code: "VY", name: "Vueling", price: 10.0 },
  { code: "TK", name: "Turkish Airlines", price: 5.0 },
  { code: "U2", name: "Easyjet", price: 19.9 },
];

const destinations = [
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

function getRandomPrice() {
  return parseFloat((Math.random() * (100 - 30) + 30).toFixed(2));
}

const routes = [];
destinations.forEach((source) => {
  destinations.forEach((destination) => {
    isRouteAlreadyAdded = routes.some(
      (route) =>
        route.source === source.code && route.destination === destination.code
    );

    if (source !== destination && !isRouteAlreadyAdded) {
      routes.push({
        source: source.code,
        destination: destination.code,
        price: getRandomPrice(),
      });
      routes.push({
        source: destination.code,
        destination: source.code,
        price: getRandomPrice(),
      });
    }
  });
});

const availableFlights = [
  {
    id: 1,
    company: "IB",
    route: { source: "MAD", destination: "LHR" },
    date: "2023-11-18",
  },
  {
    id: 2,
    company: "BA",
    route: { source: "MAD", destination: "LHR" },
    date: "2023-11-18",
  },
  {
    id: 3,
    company: "LH",
    route: { source: "BCN", destination: "CDG" },
    date: "2023-11-20",
  },
  {
    id: 4,
    company: "FR",
    route: { source: "IST", destination: "AMS" },
    date: "2023-11-22",
  },
  {
    id: 5,
    company: "VY",
    route: { source: "FRA", destination: "CPH" },
    date: "2023-12-01",
  },
  {
    id: 6,
    company: "TK",
    route: { source: "AMS", destination: "FRA" },
    date: "2023-12-05",
  },
  {
    id: 7,
    company: "U2",
    route: { source: "CDG", destination: "IST" },
    date: "2023-12-10",
  },
  {
    id: 8,
    company: "IB",
    route: { source: "LHR", destination: "MAD" },
    date: "2023-12-15",
  },
  {
    id: 9,
    company: "BA",
    route: { source: "CPH", destination: "FRA" },
    date: "2023-12-18",
  },
  {
    id: 10,
    company: "LH",
    route: { source: "FRA", destination: "AMS" },
    date: "2023-12-20",
  },
];

class FlightManager {
  getCompanies() {
    return companies;
  }

  getDestinations() {
    return destinations;
  }

  calculatePrice(
    companyPrice,
    routePrice,
    numberOfAdults,
    numberOfChildren,
    travelClass
  ) {
    companyPrice = parseFloat(companyPrice);
    routePrice = parseFloat(routePrice);
    numberOfAdults = parseInt(numberOfAdults);
    numberOfChildren = parseInt(numberOfChildren);

    const travelClassMultiplier =
      travelClass === "FIRST" ? 1.5 : travelClass === "BUSINESS" ? 1.2 : 1;

    const basePrice = companyPrice * travelClassMultiplier + routePrice;

    const numberOfPersonsWithChildrenDiscount =
      numberOfAdults + numberOfChildren * 0.6;

    return basePrice * numberOfPersonsWithChildrenDiscount;
  }

  buildAirlineNumber(companyCode, flightId) {
    const airlineNumber = `${companyCode}-${flightId}`;
    return airlineNumber;
  }

  getFlights(
    source,
    destination,
    date,
    numberOfAdults,
    numberOfChildren,
    travelClass
  ) {
    const route = routes.filter((route) => {
      return route.source === source && route.destination === destination;
    })[0];

    const flights = availableFlights.filter((flight) => {
      return (
        flight.route.source === source &&
        flight.route.destination === destination &&
        flight.date === date
      );
    });

    const flightsWithPrice = flights.map((flight) => {
      const company = companies.find((company) => {
        return company.code === flight.company;
      });

      return {
        id: flight.id,
        company: company.name,
        price: this.calculatePrice(
          company.price,
          route.price,
          numberOfAdults,
          numberOfChildren,
          travelClass
        ),
        airlineNumber: this.buildAirlineNumber(company.code, flight.id),
        route: route,
        date: flight.date,
      };
    });

    return flightsWithPrice;
  }
}

module.exports = FlightManager;
