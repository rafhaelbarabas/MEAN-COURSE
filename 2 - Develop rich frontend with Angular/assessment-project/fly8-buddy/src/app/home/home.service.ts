import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get('http://localhost:3000/companies');
  }

  getDestinations() {
    return this.http.get('http://localhost:3000/destinations');
  }
}
