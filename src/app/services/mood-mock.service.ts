import { Injectable } from '@angular/core';

@Injectable()
export class MoodMockService {

  generateMood() {
    let mood: {
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

  constructor() { }

}
