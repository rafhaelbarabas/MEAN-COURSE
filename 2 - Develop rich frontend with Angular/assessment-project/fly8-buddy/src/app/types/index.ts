export interface IATACodes {
  [key: string]: {
    name: string;
    price: number;
  };
}

export interface City {
  code: string;
  name: string;
}

export interface FlightRoute {
  source: string;
  destination: string;
  price: number;
}

export interface Flight {
  id: number;
  company: string;
  price: number;
  airlineNumber: string;
  route: FlightRoute;
  date: string;
}
