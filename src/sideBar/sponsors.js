import {computedFrom} from 'aurelia-framework';

export class Sponsors {
  constructor() {
    this.message = 'Sponsors';
    this.mapCollection = new window.Map();
    this.mapCollection.set('a', 'Alpha');
    this.mapCollection.set('b', 'Beta');
    this.mapCollection.set('c', 'Charlie');
    this.mapCollection.set('d', 'Delta');

    this.styleString = 'background: red';
    this.styleObject = {
      background: 'green'
    };
    this.person = new Person();
  }

  doSomething(foo, event) {
    console.log(foo, event);
  }
}

class Person {
  firstName = 'Cristhian';
  lastName = 'Valencia';

  @computedFrom('firstName', 'lastName')
  get fullName() { return this.firstName + ' ' + this.lastName; }
}
