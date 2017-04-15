import {DataCache} from './../data-cache';
import {inject, Lazy, All} from 'aurelia-framework';
import {ImLazy} from './../im-lazy';

@inject(DataCache, Lazy.of(ImLazy), All.of('SuperPlugIn'))
export class Events {
  constructor(dataCache, lazyOfImLazy, plugins) {
    this.events = dataCache.data;
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
