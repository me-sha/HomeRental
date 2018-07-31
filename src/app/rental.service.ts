import { Injectable } from '@angular/core';
import { Rental } from './rental/rental';
import {Observable, of} from 'rxjs';

import { default as json_00 } from '../assets/data/house-tremendous.json';
import { default as json_01 } from '../assets/data/flat-basus.json';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private _rentals: Array<Rental>;

  constructor() {
    this._rentals = new Array<Rental>();
    this._rentals.push((new Rental()).deserialize(json_00));
    this._rentals.push((new Rental()).deserialize(json_01));
  }

  getRental(id: string): Observable<Rental> {
    for(var rental of this._rentals) {
      if(rental.id === id) { return of(rental); }
    }

    return of(null);
  }

  getRentals(): Observable<Rental[]> {
    return of(this._rentals);
  }
}
