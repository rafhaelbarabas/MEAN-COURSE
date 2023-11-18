import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FlightSearchComponent, FlightDetailComponent],
  imports: [BrowserModule, ReactiveFormsModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
