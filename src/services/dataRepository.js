import {inject} from 'aurelia-framework';
import {states, jobTypes, jobSkills} from './jobsData';
import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';
import {HttpClient as HttpFetch, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NotificationPayload} from 'common/NotificationPayload';

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
  return results;
}

@inject(HttpClient, HttpFetch, 'apiRoot', EventAggregator)
export class DataRepository {
  constructor(httpClient, httpFetch, apiRoot, eventAggregator)   {
    this.httpClient = httpClient;
    this.httpFetch = httpFetch;
    this.apiRoot = apiRoot;
    this.eventAggregator = eventAggregator;

    setTimeout(() => this.backgroundNotificationReceived(this.eventAggregator), 5000);
  }

  backgroundNotificationReceived(ea) {
    ea.publish(new NotificationPayload(moment().format('HH:mm:ss')));
  }

  getEvents(pastOrFuture) {
    let promise = new Promise((resolve, reject) => {
      if (!this.events) {
        this.httpClient.get(this.apiRoot + 'api/Events')
        .then(result => {
          let data = JSON.parse(result.response);
          this.events = data.sort((a, b) =>
            a.dateTime >= b.dateTime ? 1 : -1);
          resolve(filterAndFormat(pastOrFuture, this.events));
        });
      } else {
        resolve(filterAndFormat(pastOrFuture, this.events));
      }
    });
    return promise;
  }

  getEvent(eventId) {
    return this.events.find(item => item.id === eventId);
  }

  getStates() {
    let promise = new Promise((resolve, reject) => {
      if (!this.states) {
        this.states = states;
      }
      resolve(this.states);
    });
    return promise;
  }

  getJobTypes() {
    let promise = new Promise((resolve, reject) => {
      if (!this.jobTypes) {
        this.jobTypes = jobTypes;
      }
      resolve(this.jobTypes);
    });
    return promise;
  }

  getJobSkills() {
    let promise = new Promise((resolve, reject) => {
      if (!this.jobSkills) {
        this.jobSkills = jobSkills;
      }
      resolve(this.jobSkills);
    });
    return promise;
  }

  getJobs() {
    let promise = new Promise((resolve, reject) => {
      if (!this.jobs) {
        this.httpFetch.fetch(this.apiRoot + 'api/Jobs')
          .then(response => response.json())
          .then(data => {
            this.jobs = data;
            resolve(this.jobs);
          })
          .catch(err => reject(err));
      } else {
        resolve(this.jobs);
      }
    });
    return promise;
  }

  addJob(job) {
    let promise = new Promise((resolve, reject) => {
      if (!this.jobs) {
        this.jobs = [];
      }
      this.httpFetch.fetch(this.apiRoot + 'api/Jobs', {
        method: 'POST',
        body: json(job)
      }).then(response => response.json())
        .then(data => {
          this.jobs.push(data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

}
