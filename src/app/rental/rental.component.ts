import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import * as jQuery from 'jquery';

export function paddingLeft(text: string, padChar: string, size: number): string {
  return (String(padChar).repeat(size)).substr( (size * -1), size);
};

const TEXT_LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export interface Deserializeable<T> { deserialize(json: any): T; }

export class RentalImage implements Deserializeable<RentalImage> {
   url: string;
   title: string;
   desc: string;

   deserialize(json) {
     jQuery.extend(this, json);
     return this;
   }
};

export class RentalFeature implements Deserializeable<RentalFeature> {
  symbol: string;
  desc: string;
  prohibited: boolean;

  deserialize(json) {
    jQuery.extend(this, json);
    return this;
  }
};

export class PeopleRentalFeature extends RentalFeature {
  private _people: number;

  constructor() {
    super();
    this.symbol = '&#128100;';
    this.prohibited = false;
  }

  init(people: number): PeopleRentalFeature {
    this.people = people;
    return this;
  }

  set people(people: number) {
    this.desc = 'Maximum allowed number of people: ' + people;
    this._people = people;
  }
  get people() { return this._people; }
};

export class SpaceRentalFeature extends RentalFeature {
  private _space: number;

  constructor() {
    super();
    this.symbol = '&#127968;';
    this.prohibited = false;
  }

  init(space: number): SpaceRentalFeature {
    this.space = space;
    return this;
  }

  set space(space: number) {
    this.desc = 'Living space in square meter: ' + space + ' qm';
    this._space = space;
  }
  get space() { return this._space; }
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

export class Rental implements Deserializeable<Rental> {
  uid: symbol;
  house: boolean;
  name: string;
  short_desc: string;
  detail_desc: string;
  max_people: number;
  living_space: number;
  features: Array<RentalFeature>;
  images: Array<RentalImage>;
  day_price: number;
  clean_extra: number;
  bookings: string;

  private _weekly_total: number;
  weekly_diverged = true;
  pet_extra: number;
  private _pet_number: number;
  max_pet_number: number = 8;

  constructor() {
    this.features = new Array<RentalFeature>();
    this.images = new Array<RentalImage>();
  }

  deserialize(json) {
    jQuery.extend(this, json);
    if (json.features) { this.features = jQuery.map(json.features, (e) => { return (new RentalFeature()).deserialize(e); }); }
    if (json.images)   { this.images = jQuery.map(json.images, (e) => { return (new RentalImage()).deserialize(e); }); }
    return this;
  }

  init() {
    this.uid = Symbol();
    this._pet_number = 0;
    this.features.push(
      (new PeopleRentalFeature()).init(this.max_people),
      (new SpaceRentalFeature()).init(this.living_space)
    );
  }

  featureIndexOf(feature: RentalFeature) {
    for (var i = 0; i < this.features.length; i++) {
      var f = this.features[i];
      if (f.symbol === feature.symbol ) { return i; }
    }

    return -1;
  }

  get weekly_total(): number {
    if (this.weekly_diverged) {
      this._weekly_total = this.day_price * 7
        + this.clean_extra
        + this.pet_extra * this._pet_number;
      this.weekly_diverged = false;
    }
    return this._weekly_total;
  }

  get pet_number(): number {
    return this._pet_number;
  }
  set pet_number(pnum: number) {
    if (this._pet_number !== pnum) {
      this.weekly_diverged = true;
      this._pet_number = pnum;
    }
  }
}

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit, Deserializeable<RentalComponent> {
  FEATURE_PETS_PROHIBITED = FEATURE_PETS_PROHIBITED;

  private _clean_extra = 50.0;
  private _pet_extra = 10.0;

  rentals: Array<Rental>;
  rental: Rental;

  constructor(private http: Http) {
  }

  deserialize(json): RentalComponent {
    jQuery.extend(this, json);
    if (json.rentals) { this.rentals = jQuery.map(json.rentals, (e) => { return (new Rental()).deserialize(e); }); }
    return this;
  }

  ngOnInit() {
    this.http.get('assets/data/rentals.json')
    .subscribe((res:Response) => {
      this.deserialize(res.json());
      this.rental = this.rentals[0];
    });
  }
}
