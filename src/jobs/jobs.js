export class Jobs {
  constructor() {  }

  canActivate(params, routeConfig) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(_ => resolve(false), 3000);
    });
    return promise;
  }
}
