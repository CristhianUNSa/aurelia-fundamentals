export class Discussion {
  constructor() { }

  activate() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(_ => resolve(), 3000);
    });
    return promise;
  }
}
