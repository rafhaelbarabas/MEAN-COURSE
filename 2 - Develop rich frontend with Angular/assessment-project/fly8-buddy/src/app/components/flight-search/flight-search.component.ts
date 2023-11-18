import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FlightSearchService } from './flight-search.service';

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
export class FlightSearchComponent {
  isOneWaySelected = false;

  searchForm = this.formBuilder.group<SearchFormProps>({
    source: '',
    destination: '',
    date: '',
    numberOfAdults: 0,
    numberOfChildren: 0,
    travelClass: 'ECONOMY',
  });

  travelClasses = ['FIRST', 'BUSINESS', 'ECONOMY'];

  constructor(
    private formBuilder: FormBuilder,
    private service: FlightSearchService
  ) {
    if (!this.isOneWaySelected) {
      this.searchForm.disable();
    }
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
