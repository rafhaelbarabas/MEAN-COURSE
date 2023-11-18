import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFormProps } from './flight-search.component';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  constructor(private httpClient: HttpClient) {}

  getFlights(props: SearchFormProps) {
    const {
      source,
      destination,
      date,
      numberOfAdults,
      numberOfChildren,
      travelClass,
    } = props;
    return this.httpClient.get(
      `http://localhost:3000/flights?source=${source}&destination=${destination}&date=${date}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&travelClass=${travelClass}`
    );
  }
}
