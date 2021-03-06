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

  private currentMock;

  constructor(
    private socket: SocketService,
    private moodMock: MoodMockService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  private genFreq = 1; //times per sec (Hz)

  start_mock() {
    //to be able to start new generation with changed frequency without pressing stop
    if (this.currentMock) { this.currentMock.unsubscribe() }

    this.socket.setRunning(true);
    this.currentMock = this.moodMock.getMood(this.genFreq)
      .subscribe(
      (mood) => {
        this.socket.emit('mood_event', JSON.stringify(mood));
      },
      err => {
        console.log('mood-mock error: ', err);
      })
  }

  stop_mock() {
    if (this.currentMock) {
      this.currentMock.unsubscribe();
    }
  }

  ngOnInit() {
    if (!this.authService.isAuth()) { this.router.navigate(['/login']); }

    this.socket.connect()
      .on('Unauthorized', (msg) => {
        console.log(msg);
        //this.socket.disconnect();
        this.authService.logOut();
      })

    this.authService.checkTokenValidity();
  }
