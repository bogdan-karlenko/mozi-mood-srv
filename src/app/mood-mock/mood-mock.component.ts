import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { MoodMockService } from '../services/mood-mock.service';

@Component({
  selector: 'app-mood-mock',
  templateUrl: './mood-mock.component.html',
  styleUrls: ['./mood-mock.component.css']
})
export class MoodMockComponent implements OnInit {

  constructor(
    private socket: SocketService,
    private moodMock: MoodMockService
  ) { }

  ngOnInit() {

    this.moodMock.getMood()
      .subscribe(mood => {
        this.socket.emit('mood_event', JSON.stringify(mood));
      },
      err => {
        console.log(err);
      })

    // setInterval(() => {
    //   let mood = this.moodMock.generateMood();
    //   console.log(mood);
    //   this.socket.emit('mood_event', JSON.stringify(mood));
    // }, 3 * 1000);
  }
}
