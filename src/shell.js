import toastr from 'toastr';

export class App {
  constructor() { }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia Fundamentals';
    config.addPipelineStep('authorize', NavToastStep);
    // config.addPipelineStep('authorize', LogNextStep);
    // config.addPipelineStep('preActivate', LogNextStep);
    // config.addPipelineStep('preRender', LogNextStep);
    // config.addPipelineStep('postRender', LogNextStep);
    //config.options.pushState = true; //Removes hashtag from URL
    config.map([
      {
        route: ['', 'events'],
        viewPorts: {
          mainContent: { moduleId: './events/events'},
          sideBar: { moduleId: './sideBar/sponsors'}
        },
        name: 'Events',
        title: 'Events',
        nav: true
      },
      {
        route: 'jobs',
        viewPorts: {
          mainContent: { moduleId: './jobs/jobs' },
          sideBar: { moduleId: './sideBar/sponsors'}
        },
        title: 'Jobs',
        nav: true
      },
      {
        route: 'discussion',
        viewPorts: {
          mainContent: { moduleId: './discussion/discussion' },
          sideBar: { moduleId: './sideBar/ads'}
        },
        title: 'Discussion',
        nav: true
      },
      {
        route: 'eventDetail/:eventId',
        viewPorts: {
          mainContent: { moduleId: './events/eventDetail' },
          sideBar: { moduleId: './sideBar/ads'}
        },
        name: 'eventDetail'
      }
    ]);
  }
}

class NavToastStep {
  run(navigationInstruction, next) {
    return next().then(result => {
      if (result.status === 'canceled') {
        toastr.error('Navigation cancelled');
      }
      // if (result.status === 'completed') {
      //   toastr.info('Navigation complete');
      // }
      return result;
    });
  }
}
