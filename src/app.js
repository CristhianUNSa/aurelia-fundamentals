export class App {
  constructor() { }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia Fundamentals';
    config.map([
      { route: ['', 'events'], moduleId: './events/events', name: 'Events', title: 'Events', nav: true},
      { route: 'jobs', moduleId: './jobs/jobs', title: 'Jobs', nav: true},
      { route: 'discussion', moduleId: './discussion/discussion', title: 'Discussion', nav: true},
      { route: 'eventDetail/:eventId', moduleId: './events/eventDetail', name: 'eventDetail'}
    ]);
  }
}
