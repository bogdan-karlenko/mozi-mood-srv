import { Component, OnInit } from '@angular/core';
import { MoodMockService } from '../services/mood-mock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private router:Router,
    private moodMock:MoodMockService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('isAuthenticated') === null) {
      this.router.navigate(['/login']);
    }

    let mood = this.moodMock.generateMood();
    console.log(mood);
  }
}
