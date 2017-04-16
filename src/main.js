import environment from './environment';
import { ViewLocator } from 'aurelia-framework';
import {Plugin1} from './plugin1';
import {Plugin2} from './plugin2';

export function configure(aurelia) {
  aurelia.use.transient('SuperPlugIn', Plugin1);
  aurelia.use.transient('SuperPlugIn', Plugin2);

  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  // ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
  //   let moduleId = origin.moduleId;
  //   let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
  //   return id.replace('viewmodels', 'views') + '.html';
  // };

  aurelia.start().then(() => aurelia.setRoot('shell'));
}
