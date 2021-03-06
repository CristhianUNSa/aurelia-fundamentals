import {DataRepository} from './../services/dataRepository';
import {inject} from 'aurelia-framework';
import {Router, activationStrategy} from 'aurelia-router';

@inject(DataRepository, Router)
export class Events {
  constructor(dataRepository, router) {
    this.dataRepository = dataRepository;
    this.router = router;
  }

  activate(params, routeConfig) {
    let pastOrFuture = routeConfig.name === '' ? 'future' : routeConfig.name;
    this.dataRepository.getEvents(pastOrFuture).then(events => {
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

  determineActivationStrategy() {
    return activationStrategy.invokeLifecycle;
  }

  goToDiscussion() {
    this.router.navigate('#/discussion');
    //this.router.navigateToRoute('eventDetail', {eventId: this.events[0].id});
  }
}
