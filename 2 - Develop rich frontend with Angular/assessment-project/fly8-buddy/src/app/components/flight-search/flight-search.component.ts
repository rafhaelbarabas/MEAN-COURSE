import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FlightSearchService } from './flight-search.service';
import { City, Flight } from 'src/app/types';

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
  defaultSearchProps: SearchFormProps = {
    source: '',
    destination: '',
    date: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    travelClass: 'ECONOMY',
  };
  searchForm = this.formBuilder.group<SearchFormProps>(this.defaultSearchProps);
  flights: Flight[] = [];
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
    this.service
      .getFlights(this.searchForm.value as SearchFormProps)
      .subscribe((res) => {
        this.flights = res;
      });
  }

  resetFilters(): void {
    this.searchForm.setValue(this.defaultSearchProps);
    this.flights = [];
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
