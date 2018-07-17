import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const TEXT_LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export class Feature {
  symbol: SafeHtml;
  desc: string;
  prohibited: boolean;

  constructor(symb: string, desc: string, proh: boolean = false) {
    this.symbol = symb;
    this.desc = desc;
    this.prohibited = proh;
  }
}

export class Image {
  url: string;
  title: string;
  desc: string;

  constructor(url: string, title: string = '', desc: string = '') {
    this.url = url;
    this.title = title;
    this.desc = desc;
  }
}

const IMAGE_RENTAL_DEFAULT: Image = {
  url: 'images/rental/default.jpg',
  title: 'Default Rental',
  desc: 'Default Rental',
};

const FEATURE_SMOKING_PROHIBITED: Feature = {
  desc: 'No smoking inside!',
  symbol: '&#128684;',
  prohibited: true
};

const FEATURE_PETS_ALLOWED = new Feature(
  'Pets are allowed.',
  '&#128021;',
  false
);

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
  id: number;
  house: boolean;
  name: string;
  images: Array<Image>;
  short_desc: string;
  detail_desc: string;
  features: Array<Feature>;
  day_price: number;
  clean_extra: number;
  private _weekly_total: number;
  weekly_diverged = true;
  pet_extra: number;
  private _pet_number: number;

  constructor(id: number,
              house: boolean,
              name: string,
              short_desc: string,
              detail_desc: string,
              day_price: number,
              clean_extra: number,
              pet_extra: number,
              pet_number: number = 0,
              features: Array<Feature> = [],
              images: Array<Image> = [IMAGE_RENTAL_DEFAULT]) {
    this.id = id;
    this.house = house;
    this.name = name;
    this.short_desc = short_desc;
    this.detail_desc = detail_desc;
    this.features = features;
    this.day_price = day_price;
    this.clean_extra = clean_extra;
    this.pet_extra = pet_extra;
    this._pet_number = pet_number;
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
    this.rental = new Rental(
      1,
      true,
      'House Tremendous',
      'Tremendous holiday house with a lovely garden.',
      TEXT_LOREM_IPSUM,
      65.25,
      this._clean_extra,
      this._pet_extra,
      0
    );
    this.rental.features = [FEATURE_PETS_PROHIBITED, FEATURE_SMOKING_PROHIBITED, FEATURE_BEACH_CHAIR, FEATURE_INTERNET_WLAN],
    this.rental.images = [new Image('assets/images/rental/tremendous/front.jpg'), new Image('assets/images/rental/tremendous/garden.jpg')]
    this.rentals.push(this.rental);
  }

  ngOnInit() {}
}
