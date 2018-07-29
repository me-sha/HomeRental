import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { Rental } from  '../rental/rental';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  rentals: Array<Rental>;

  constructor(private rentalService: RentalService) {
    this.rentals = new Array<Rental>();
  }

  ngOnInit() {
    this.rentalService.rentals.subscribe((rentals) => {
      this.rentals = rentals;
    });
  }
}
