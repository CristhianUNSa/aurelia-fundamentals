import {eventsData} from './eventsData';
import {jobsData, states, jobTypes, jobSkills} from './jobsData';
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
        this.jobs = jobsData;
      }
      resolve(this.jobs);
    });
    return promise;
  }

  addJob(job) {
    let promise = new Promise((resolve, reject) => {
      if (!this.jobs) {
        this.jobs = [];
      }
      this.jobs.push(job);
      resolve(job);
    });
    return promise;
  }

}
