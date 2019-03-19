import { Deserializeable } from '../util/deserializeable';

export class RentalFeature implements Deserializeable<RentalFeature> {
  symbol: string;
  desc: string;
  prohibited: boolean;
  people: false;
  space: false;

  deserialize(json) {
    jQuery.extend(this, json);
    return this;
  }

  getDesc(): string { return this.desc; }

  isPeopleFeature() {
    return this.symbol == FEATURE_MAX_PEOPLE.symbol;
  }

  isSpaceFeature() {
    return this.symbol == FEATURE_LIVING_SPACE.symbol;
  }
};

export const FEATURE_MAX_PEOPLE: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128100;',
  desc: 'Maximum allowed number of guests',
  prohibited: false
});

export const FEATURE_LIVING_SPACE: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#127968;',
  desc: 'Living space in square meter',
  prohibited: false
});

export const FEATURE_SMOKING: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128684;',
  desc: 'No smoking inside!',
  prohibited: false
});

export const FEATURE_SMOKING_PROHIBITED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128684;',
  desc: 'No smoking inside!',
  prohibited: true
});

export const FEATURE_PETS_ALLOWED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128021;',
  desc: 'Pets are allowed',
  prohibited: false
});

export const FEATURE_PETS_PROHIBITED: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128021;',
  desc: 'No pets are allowed!',
  prohibited: true
});

export const FEATURE_BEACH_CHAIR: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#127958;',
  desc: 'Personal Beach Chair on the beach',
  prohibited: false
});

export const FEATURE_TV: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128250;',
  desc: 'TV available',
  prohibited: false
});

export const FEATURE_INTERNET_WLAN: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128246;',
  desc: 'Internet via WLAN',
  prohibited: false
});

export const FEATURE_WASHER_DISHES: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#127869;',
  desc: 'Dish washer available',
  prohibited: false
});

export const FEATURE_WASHER_LAUNDRY: RentalFeature = (new RentalFeature()).deserialize({
  symbol: '&#128085;',
  desc: 'Laundry washer available',
  prohibited: false
});
