import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../rental/rental';
import { RentalFeature } from './feature';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  @Input('rental') rental: Rental;
  features: Array<RentalFeature>;
  feature: RentalFeature;
  featureSelected: boolean = false;

  constructor() {}

  ngOnInit() {
    this.features = this.rental.features;
  }

  onFeatureSelect(feature: RentalFeature): void {
    if (feature == this.feature) {
      this.featureSelected = !this.featureSelected;
      return;
    }

    this.feature = feature;
    this.featureSelected = true;
  }
}
