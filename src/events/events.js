import {DataRepository} from './../services/dataRepository';
import {inject, Lazy, All} from 'aurelia-framework';
import {ImLazy} from './../im-lazy';
import {Router} from 'aurelia-router';

@inject(DataRepository, Router, Lazy.of(ImLazy), All.of('SuperPlugIn'))
export class Events {
  constructor(dataRepository, router, lazyOfImLazy, plugins) {
    this.dataRepository = dataRepository;
    this.router = router;
    this.lazyOfImLazy = lazyOfImLazy;

    plugins.forEach(function(plugin) {
      plugin.doPlugInStuff();
    });
  }

  activate(params) {
    this.dataRepository.getEvents().then(events => {
      if (params.speaker || params.topic) {
        let filteredResults = [];
        events.forEach(item=> {
          if (params.speaker && item.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0) {
            if (filteredResults.indexOf(item) === -1) filteredResults.push(item);
          }
          if (params.topic && item.topic.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0) {
            if (filteredResults.indexOf(item) === -1) filteredResults.push(item);
          }
        });
        this.events = filteredResults;
      } else {
        this.events = events;
      }
      this.events.forEach(item => item.detailUrl = this.router.generate('eventDetail', {eventId: item.id}));
    });
  }

  goToDiscussion() {
    this.router.navigate('#/discussion');
    //this.router.navigateToRoute('eventDetail', {eventId: this.events[0].id});
  }
}
