import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { Rental } from  '../rental/rental';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css'],
})
export class RentalsComponent implements OnInit {
  rentals: Array<Rental>;

  filtHouses: boolean = true;
  filtFlats: boolean = true;

  constructor(private rentalService: RentalService) {
    this.rentals = new Array<Rental>();
  }

  ngOnInit() {
    this.rentalService.getRentals().subscribe((rentals) => {
      this.rentals = rentals;
    });
  }

  getRentals() {
    return this.rentals
      .filter(rntl => rntl.house === this.filtHouses);
  }
}
