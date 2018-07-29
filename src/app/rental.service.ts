import { Injectable } from '@angular/core';
import { Rental } from './rental/rental';
import {Observable, of} from 'rxjs';

import { default as data_json } from '../assets/data/rentals.json';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private _rentals: Rental[];

  constructor() {
    this._rentals = jQuery.map(data_json.rentals, (e) => {
      return (new Rental()).deserialize(e);
    });
  }

  get rentals(): Observable<Rental[]> {
    return of(this._rentals);
  }
}
