import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};

  login() {
    if (!this.user.username || !this.user.password) {
      return false
    }

    this.authService.login(this.user)
      .subscribe(
      (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/user']);
      })
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authService.isAuth()) { this.router.navigate(['/user']); }
    this.authService.checkTokenValidity();
  }

}
