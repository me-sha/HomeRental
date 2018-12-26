import { Deserializeable } from './deserializeable';

export class RentalFeature implements Deserializeable<RentalFeature> {
  symbol: string;
  desc: string;
  prohibited: boolean;

  deserialize(json) {
    jQuery.extend(this, json);
    return this;
  }

  getDesc(): string { return this.desc; }
};

export class PeopleRentalFeature extends RentalFeature {
  people: number;

  constructor() {
    super();
    this.symbol = '&#128100;';
    this.prohibited = false;
  }

  init(people: number): PeopleRentalFeature {
    this.people = people;
    return this;
  }

  getDesc(): string {
    console.log('It works here');
    return this.desc + this.people;
  }
};

export class SpaceRentalFeature extends RentalFeature {
  space: number;

  constructor() {
    super();
    this.symbol = '&#127968;';
    this.prohibited = false;
  }

  init(space: number): SpaceRentalFeature {
    this.space = space;
    return this;
  }

  getDesc(): string { return this.desc + this.space; }
};
