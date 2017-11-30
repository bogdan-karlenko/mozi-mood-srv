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
    if (this.authService.login(this.user)) {
      this.router.navigate(['/user']);
    }
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isAuthenticated') !== null) {
      this.router.navigate(['/user']);
    }
  }

}
