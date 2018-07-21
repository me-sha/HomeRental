import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http } from '@angular/http';

export function paddingLeft(text: string, padChar: string, size: number): string {
  return (String(padChar).repeat(size)).substr( (size * -1), size);
};

const TEXT_LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export class RentalImage {
   url: string;
   title: string;
   desc: string;

   constructor(url: string, title: string = '', desc: string = '') {
     this.url = url;
     this.title = title;
     this.desc = desc;
   }
};

export class Feature {
  symbol: SafeHtml;
  desc: string;
  prohibited: boolean;

  constructor(symb: string, desc: string, proh: boolean = false) {
    this.symbol = symb;
    this.desc = desc;
    this.prohibited = proh;
  }
};

export class PeopleFeature extends Feature {
  people: number;

  constructor(people: number) {
    super(
      '&#128100;',
      'Maximum allowed number of people: ' + people,
      false
    );
    this.people = people;
  }
};

export class SpaceFeature extends Feature {
  space: number;

  constructor(space: number) {
    super(
      '&#127968;',
      'Living space in square meter: ' + space + ' qm',
      false
    );
    this.space = space;
  }
};

const FEATURE_SMOKING: Feature = {
  desc: 'No smoking inside!',
  symbol: '&#128684;',
  prohibited: false
};

const FEATURE_SMOKING_PROHIBITED: Feature = {
  desc: 'No smoking inside!',
  symbol: '&#128684;',
  prohibited: true
};

export const FEATURE_PETS_ALLOWED: Feature = {
  desc: 'Pets are allowed.',
  symbol: '&#128021;',
  prohibited: false
};

export const FEATURE_PETS_PROHIBITED: Feature = {
  desc: 'No pets are allowed!',
  symbol: '&#128021;',
  prohibited: true
};

const FEATURE_BEACH_CHAIR: Feature = {
  desc: 'Personal Beach Chair on the beach.',
  symbol: '&#127958;',
  prohibited: false
};

const FEATURE_TV: Feature = {
  desc: 'TV available.',
  symbol: '&#128250;',
  prohibited: false
};

const FEATURE_INTERNET_WLAN: Feature = {
  desc: 'Internet via WLAN',
  symbol: '&#128246;',
  prohibited: false
};

const FEATURE_WASHER_DISHES: Feature = {
  desc: 'Dish washer available.',
  symbol: '&#127869;',
  prohibited: false
};

const FEATURE_WASHER_LAUNDRY: Feature = {
  desc: 'Laundry washer available.',
  symbol: '&#128085;',
  prohibited: false
};

export class Rental {
  uid: symbol;
  house: boolean;
  name: string;
  short_desc: string;
  detail_desc: string;
  max_people: number;
  living_space: number;
  features: Array<Feature>;
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
    this.uid = Symbol();
    this._pet_number = 0;
    this.features = new Array<Feature>();
    this.images = new Array<RentalImage>();
    this.images.push(new RentalImage('assets/images/rental/default.jpg'))
  }

  init() {

    this.features.push(
      new PeopleFeature(this.max_people),
      new SpaceFeature(this.living_space)
    );
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
export class RentalComponent implements OnInit {
  private _clean_extra = 50.0;
  private _pet_extra = 10.0;

  rentals: Array<Rental> = [];
  rental: Rental;

  data;

  constructor(private http: Http) {
    this.http.get('assets/data/tremendous-rental.json')
      .subscribe(res => this.data = res.json());
  }

  ngOnInit() {
    this.rental = new Rental();
    this.rental.house = true;
    this.rental.name = 'House Tremendous';
    this.rental.short_desc = 'Tremendous holiday house with a lovely garden.';
    this.rental.detail_desc = TEXT_LOREM_IPSUM;
    this.rental.max_people = 4;
    this.rental.living_space = 65;
    this.rental.day_price = 65.25;
    this.rental.clean_extra = this._clean_extra;
    this.rental.pet_extra = this._pet_extra;
    this.rental.init()
    this.rental.features.push(
      FEATURE_PETS_PROHIBITED,
      FEATURE_SMOKING_PROHIBITED,
      FEATURE_BEACH_CHAIR,
      FEATURE_TV,
      FEATURE_INTERNET_WLAN,
      FEATURE_WASHER_DISHES,
      FEATURE_WASHER_LAUNDRY,
    );
    this.rental.images.push(
      new RentalImage('assets/images/rental/tremendous/garden.jpg'),
      new RentalImage('assets/images/rental/tremendous/garden.jpg'),
      new RentalImage('assets/images/rental/tremendous/garden.jpg'),
      new RentalImage('assets/images/rental/tremendous/garden.jpg')
    );

    this.rentals.push(this.rental);
  }
}
