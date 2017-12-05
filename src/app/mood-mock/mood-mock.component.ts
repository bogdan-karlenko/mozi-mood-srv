import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { MoodMockService } from '../services/mood-mock.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mood-mock',
  templateUrl: './mood-mock.component.html',
  styleUrls: ['./mood-mock.component.css']
})
export class MoodMockComponent implements OnInit {

  constructor(
    private socket: SocketService,
    private moodMock: MoodMockService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  start_mock() {
    console.log('mock started');
  }

    stop_mock() {
    console.log('mock stoped');
  }

  ngOnInit() {

    this.moodMock.getMood()
      .subscribe(
      mood => {
        this.socket.emit('mood_event', JSON.stringify(mood));
      },
      err => {
        console.log('mood-mock error: ', err);
      })

    if (!this.authService.isAuth()) {
      this.router.navigate(['/login']);
    }
  }
}
