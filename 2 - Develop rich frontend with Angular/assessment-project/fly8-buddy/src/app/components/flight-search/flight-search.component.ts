import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

export interface SearchFormProps {
  origin: string;
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

  searchForm = this.formBuilder.group({
    origin: '',
    destination: '',
    date: '',
    numberOfAdults: 0,
    numberOfChildren: 0,
    travelClass: 'ECONOMY',
  });

  travelClasses = ['FIRST', 'BUSINESS', 'ECONOMY'];

  constructor(private formBuilder: FormBuilder) {
    if (!this.isOneWaySelected) {
      this.searchForm.disable();
    }
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
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
