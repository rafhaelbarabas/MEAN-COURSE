import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FlightSearchService } from './flight-search.service';
import { City } from 'src/app/types';

export interface SearchFormProps {
  source: string;
  destination: string;
  date: string;
  numberOfAdults: number;
  numberOfChildren: number;
  travelClass: 'FIRST' | 'BUSINESS' | 'ECONOMY';
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  isOneWaySelected = false;
  cities: City[] = [];
  searchForm = this.formBuilder.group<SearchFormProps>({
    source: '',
    destination: '',
    date: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    travelClass: 'ECONOMY',
  });

  travelClasses = ['FIRST', 'BUSINESS', 'ECONOMY'];

  constructor(
    private formBuilder: FormBuilder,
    private service: FlightSearchService
  ) {}

  ngOnInit(): void {
    if (!this.isOneWaySelected) {
      this.searchForm.disable();
    }

    this.service.getDestinations().subscribe((res) => {
      this.cities = res;
    });
  }

  onSubmit(): void {
    console.log(this.searchForm.value);

    this.service
      .getFlights(this.searchForm.value as SearchFormProps)
      .subscribe((res) => {
        console.log(res);
      });
  }

  toggleOneWay(): void {
    this.isOneWaySelected = !this.isOneWaySelected;

    if (this.isOneWaySelected) {
      this.searchForm.enable();
    } else {
      this.searchForm.disable();
    }
  }
}
