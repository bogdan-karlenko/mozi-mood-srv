import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoodMockService {

  generateMood() {

    const mood: {
      anger: number,
      smile: number,
      sadness: number
    } = {
        anger: Math.floor(Math.random() * (10 - 0) + 0),
        smile: Math.floor(Math.random() * (10 - 0) + 0),
        sadness: Math.floor(Math.random() * (10 - 0) + 0)
      }

    return mood
  }

  getMood() {
    return new Observable(observer => {
      const genMood = this.generateMood;
      setTimeout(function run() {

        let mood = genMood();
        if (mood) {
          observer.next(mood);
        } else {
          observer.error('Mood was not generated');
        }

        setTimeout(run, 3 * 1000);
      }, 3 * 1000);
      //observer.complete();
    })
  }

  constructor() { }

}
