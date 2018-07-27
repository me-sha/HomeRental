import * as jQuery from 'jquery';

export interface Deserializeable<T> { deserialize(json: any): T; }
