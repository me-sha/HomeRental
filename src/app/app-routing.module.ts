import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rental', component: RentalComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}
