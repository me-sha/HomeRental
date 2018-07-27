import { Deserializeable } from './deserializeable';

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
