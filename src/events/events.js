import {DataRepository} from './../services/dataRepository';
import {inject, Lazy, All} from 'aurelia-framework';
import {ImLazy} from './../im-lazy';

@inject(DataRepository, Lazy.of(ImLazy), All.of('SuperPlugIn'))
export class Events {
  constructor(dataRepository, lazyOfImLazy, plugins) {
    dataRepository.getEvents().then(events => this.events = events);
    this.lazyOfImLazy = lazyOfImLazy;

    plugins.forEach(function(plugin) {
      plugin.doPlugInStuff();
    });
  }

  createAndUseLazy() {
    console.log('about to use lazy');
    this.lazyOfImLazy().doStuff();
  }
}
