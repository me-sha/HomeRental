import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RentalComponent } from './rental/rental.component';
import { RentalsComponent } from './rentals/rentals.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rental/:id', component: RentalComponent },
  { path: 'rentals', component: RentalsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}
