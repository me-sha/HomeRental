import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

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

const FEATURE_PETS_ALLOWED: Feature = {
  desc: 'Pets are allowed.',
  symbol: '&#128021;',
  prohibited: false
};

const FEATURE_PETS_PROHIBITED: Feature = {
  desc: 'No pets are allowed!',
  symbol: '&#128021;',
  prohibited: true
};

const FEATURE_BEACH_CHAIR: Feature = {
  desc: 'Personal Beach Chair on the beach.',
  symbol: '&#127958;',
  prohibited: false
};

const FEATURE_INTERNET_WLAN: Feature = {
  desc: 'Internet via WLAN',
  symbol: '&#128246;',
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
  private _weekly_total: number;
  weekly_diverged = true;
  pet_extra: number;
  private _pet_number: number;

  constructor(house: boolean,
              name: string,
              short_desc: string,
              detail_desc: string,
              max_people: number,
              living_space: number,
              day_price: number,
              clean_extra: number,
              pet_extra: number) {
    this.uid = Symbol();
    this.house = house;
    this.name = name;
    this.short_desc = short_desc;
    this.detail_desc = detail_desc;
    this.max_people = max_people;
    this.living_space = living_space;
    this.day_price = day_price;
    this.clean_extra = clean_extra;
    this.pet_extra = pet_extra;
    this._pet_number = 0;
    this.features = new Array<Feature>();
    this.features.push(
      new PeopleFeature(max_people),
      new SpaceFeature(living_space)
    );
    this.images = new Array<RentalImage>();
    this.images.push(new RentalImage('assets/images/rental/default.jpg'))
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
  set weekly_total(weekly: number) {
    this._weekly_total = weekly;
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

  constructor() {
  }

  ngOnInit() {
    this.rental = new Rental(
      true, //house
      'House Tremendous', //name
      'Tremendous holiday house with a lovely garden.', //short_desc
      TEXT_LOREM_IPSUM, //detail_desc
      4, //max_people
      65, //living_space
      65.25, //day_price
      this._clean_extra, //clean_extra
      this._pet_extra //pet_extra
    );
    this.rental.features.push(
      FEATURE_PETS_PROHIBITED,
      FEATURE_SMOKING_PROHIBITED,
      FEATURE_BEACH_CHAIR,
      FEATURE_INTERNET_WLAN
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
