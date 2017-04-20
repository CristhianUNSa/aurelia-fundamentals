import environment from './environment';

export function configure(aurelia) {
  aurelia.use.instance('apiRoot', 'http://brianapidemos.azurewebsites.net/CommunityApi/');
  aurelia.use.globalResources('common/dateFormat');
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-dialog')
    .plugin('aurelia-validation')
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  aurelia.start().then(() => aurelia.setRoot('shell'));
}
