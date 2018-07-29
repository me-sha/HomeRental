import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as jQuery from 'jquery';
import { RentalFeature, PeopleRentalFeature, SpaceRentalFeature} from './feature';
import { RentalImage } from './image';
import { Rental } from './rental';

export function paddingLeft(text: string, padChar: string, size: number): string {
  return (String(padChar).repeat(size)).substr( (size * -1), size);
};

const FEATURE_SMOKING: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128684;',
  desc: 'No smoking inside!',
  prohibited: false
});

const FEATURE_SMOKING_PROHIBITED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128684;',
  desc: 'No smoking inside!',
  prohibited: true
});

export const FEATURE_PETS_ALLOWED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128021;',
  desc: 'Pets are allowed.',
  prohibited: false
});

export const FEATURE_PETS_PROHIBITED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128021;',
  desc: 'No pets are allowed!',
  prohibited: true
});

const FEATURE_BEACH_CHAIR: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#127958;',
  desc: 'Personal Beach Chair on the beach.',
  prohibited: false
});

const FEATURE_TV: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128250;',
  desc: 'TV available.',
  prohibited: false
});

const FEATURE_INTERNET_WLAN: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128246;',
  desc: 'Internet via WLAN',
  prohibited: false
});

const FEATURE_WASHER_DISHES: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#127869;',
  desc: 'Dish washer available.',
  prohibited: false
});

const FEATURE_WASHER_LAUNDRY: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128085;',
  desc: 'Laundry washer available.',
  prohibited: false
});

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  FEATURE_PETS_PROHIBITED = FEATURE_PETS_PROHIBITED;

  private _clean_extra = 50.0;
  private _pet_extra = 10.0;

  rentals: Array<Rental>;
  rental: Rental;

  private _mailto: String = "mailto:info@hhr.com?cc=cc@site.com, another@site.com, me@site.com";
  get mailto(): string {
    var subject ="&subject=rental-request: " + this.rental.name;
    var body = "&body=Body-goes-here";
    return this._mailto + subject + body;
  }

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('assets/data/rentals.json').subscribe((res) => {
      this.rentals = jQuery.map(res.json().rentals, (e) => {
        return (new Rental()).deserialize(e);
      });
      this.rental = this.rentals[0];
    });
  }
}
