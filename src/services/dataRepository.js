import {eventsData} from './eventsData';
import moment from 'moment';

export class DataRepository {
  constructor()   {  }

  getEvents() {
    let promise = new Promise((resolve, reject) => {
      if (!this.events) {
        setTimeout(_ => {
          this.events = eventsData;
          this.events.forEach(item => {
            let dateTime = moment(item.dateTime).format('MM/DD/YYYY HH:mm');
            item.dateTime = dateTime;
          });
          resolve(this.events);
        }, 2000);
      } else {
        resolve(this.events);
      }
    });
    return promise;
  }

  getEvent(eventId) {
    return this.events.find(item => item.id === eventId);
  }
}
