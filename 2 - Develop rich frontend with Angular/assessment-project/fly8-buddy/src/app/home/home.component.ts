import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { City } from '../types';

interface CompanyPrices {
  code: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  prices: CompanyPrices[] = [];
  cities: City[] = [];

  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.service.getCompanies().subscribe((res) => {
      this.prices = res as CompanyPrices[];
    });
    this.service.getDestinations().subscribe((res) => {
      this.cities = res as City[];
    });
  }
}
