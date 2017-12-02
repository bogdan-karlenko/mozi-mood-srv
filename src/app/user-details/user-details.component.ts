import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  goToMood() {
     this.router.navigate(['/mood']);
  }

  ngOnInit() {
    if (!this.authService.isAuth()) {
      this.router.navigate(['/login']);
    }
  }
}
