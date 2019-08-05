import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RentalFeature, FEATURE_PETS_PROHIBITED } from '../features/feature';
import { RentalImage } from './image'
import { Rental } from './rental';
import { RentalService } from '../rental.service';

export function paddingLeft(text: string, padChar: string, size: number): string {
  return (String(padChar).repeat(size)).substr( (size * -1), size);
};

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rental: Rental;

  private _mailto: String = "mailto:info@hhr.com?cc=cc@site.com";

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

  moveToNextImage(el): void {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    });
  }

  @ViewChild('gallery', { read: ElementRef, static: true }) public gallery: ElementRef<any>;
  moveToFirstImage(el): void {
    el = this.gallery.nativeElement.children[0];
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  isPetsAllowed(): boolean {
    var index = this.rental.featureIndexOf(FEATURE_PETS_PROHIBITED);
    if (index > -1) { return !this.rental.features[index].prohibited; }
    return false;
  }

  mailTo(): boolean {
    var subject = "&subject=rental-request:" + this.rental.name;
    var body = "&body=" + encodeURI(""
             + "People: (1-" + this.rental.max_people + ")\n"
             + "Pets: (0-" + this.rental.max_pet_number + ")\n"
             + "Weeks: (1-" + this.rental.max_weeks + ")\n"
             + "Date: DD.MM." + (new Date()).getFullYear() + "\n");
    window.location.href = this._mailto + subject + body;
    return true;
  }
}
