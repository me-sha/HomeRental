import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RentalFeature, PeopleRentalFeature, SpaceRentalFeature } from './feature';
import { RentalImage } from './image'
import { Rental } from './rental';
import { RentalService } from '../rental.service';

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

  rental: Rental;
  feature: RentalFeature;

  private _mailto: String = "mailto:info@hhr.com?cc=cc@site.com, another@site.com, me@site.com";

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService,
              private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.rentalService.getRental(id).subscribe((rental) => {
      if (rental === null) { this.location.back(); }
      this.rental = rental;
    });
  }

  public moveToNextImage(el): void {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    });
  }

  @ViewChild('gallery', { read: ElementRef }) public gallery: ElementRef<any>;
  public moveToFirstImage(el): void {
    //el = document.getElementById('gallery').querySelector(':first-child');
    el = this.gallery.nativeElement.children[0];
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    console.log('in moveToFirstImage(): '+el);
  }

  onRentalSelect(feature: RentalFeature): void {
    this.feature = feature;
  }

  isPetsAllowed(): boolean {
    var index = this.rental.featureIndexOf(FEATURE_PETS_PROHIBITED);
    if (index > -1) { return !this.rental.features[index].prohibited; }
    return false;
  }

  mailTo(): boolean {
    var subject ="&subject=rental-request: " + this.rental.name;
    var body = "&body=Body-goes-here";
    window.location.href = this._mailto + subject + body;
    return true;
  }
}
