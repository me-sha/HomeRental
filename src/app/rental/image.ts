import {Deserializeable} from '../util/deserializeable';

export class RentalImage implements Deserializeable<RentalImage> {
   url: string;
   title: string;
   desc: string;

   deserialize(json) {
     jQuery.extend(this, json);
     return this;
   }
};
