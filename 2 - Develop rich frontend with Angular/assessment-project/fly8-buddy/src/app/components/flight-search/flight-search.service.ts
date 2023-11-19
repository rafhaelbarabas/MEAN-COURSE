import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFormProps } from './flight-search.component';
import { Observable } from 'rxjs';
import { City, Flight } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  constructor(private httpClient: HttpClient) {}

  getFlights(props: SearchFormProps): Observable<Flight[]> {
    const {
      source,
      destination,
      date,
      numberOfAdults,
      numberOfChildren,
      travelClass,
    } = props;
    return this.httpClient.get<Flight[]>(
      `http://localhost:3000/flights?source=${source}&destination=${destination}&date=${date}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&travelClass=${travelClass}`
    );
  }

  getDestinations(): Observable<City[]> {
    return this.httpClient.get<City[]>('http://localhost:3000/destinations');
  }
}
