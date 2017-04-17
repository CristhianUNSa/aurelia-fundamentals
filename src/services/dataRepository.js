import {eventsData} from './eventsData';
import moment from 'moment';


function filterAndFormat(pastOrFuture, events) {
  let results = JSON.parse(JSON.stringify(events));
  if (pastOrFuture === 'past') {
    results = results.filter(item => {
      let itemDateTimeMoment = moment(item.dateTime);
      let now = moment();
      return itemDateTimeMoment.isBefore(now);
    });
  } else if (pastOrFuture === 'future') {
    results = results.filter(item => {
      let itemDateTimeMoment = moment(item.dateTime);
      let now = moment();
      return itemDateTimeMoment.isAfter(now);
    });
  }
  results.forEach(item => {
    let dateTime = moment(item.dateTime)
                    .format('MM/DD/YYYY HH:mm');
    item.dateTime = dateTime;
  });

  return results;
}

export class DataRepository {
  constructor()   {  }

  getEvents(pastOrFuture) {
    let promise = new Promise((resolve, reject) => {
      if (!this.events) {
        setTimeout(_ => {
          this.events = eventsData;
          let sorted = this.events.sort((a, b) => {
            a.dateTime >= b.dateTime ? 1 : -1;
          });
          this.events = sorted;
          resolve(filterAndFormat(pastOrFuture, this.events));
        }, 60);
      } else {
        resolve(filterAndFormat(pastOrFuture, this.events));
      }
    });
    return promise;
  }

  getEvent(eventId) {
    return this.events.find(item => item.id === eventId);
  }
}
