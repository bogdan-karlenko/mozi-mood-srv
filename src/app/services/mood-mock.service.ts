import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable()
export class MoodMockService {

  generateMood() {

    const mood: {
      anger: number,
      smile: number,
      sadness: number
    } = {
        anger: Math.floor(Math.random() * (10 - 1) + 1), //(a - b) + b | a = max, b = min
        smile: Math.floor(Math.random() * (10 - 1) + 1),
        sadness: Math.floor(Math.random() * (10 - 1) + 1)
      }

    return mood
  }

  getMood(frequency) {
    const delay = 1000 / frequency;
    return Rx.Observable
      .timer(delay, delay)
      .map(() => { return this.generateMood() })
  }

  constructor() { }

}
