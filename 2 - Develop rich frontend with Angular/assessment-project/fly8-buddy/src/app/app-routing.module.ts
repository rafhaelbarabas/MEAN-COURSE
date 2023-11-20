import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
3;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'flight-details', component: FlightDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
