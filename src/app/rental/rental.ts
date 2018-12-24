import { Deserializeable } from './deserializeable';
import { RentalFeature , PeopleRentalFeature, SpaceRentalFeature} from './feature';
import { RentalImage } from './image'

export class Rental implements Deserializeable<Rental> {
  id: string;
  name: string;
  house: boolean;
  short_desc: string;
  detail_desc: string;
  max_people: number;
  living_space: number;
  features: Array<RentalFeature>;
  images: Array<RentalImage>;
  day_price: number;
  clean_extra: number;

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
