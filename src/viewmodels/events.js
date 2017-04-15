import {DataCache} from './../data-cache';
import {inject} from 'aurelia-framework';

@inject(DataCache)
export class Events {
  constructor(dataCache) {
    this.events = dataCache.data;
  }
}
