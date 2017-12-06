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

  private warning:string;
  setWarning(warning) { this.warning = warning };
  getWarning() { return this.warning };

  login() {
    if (!this.user.username || !this.user.password) {
      this.setWarning('empty');
      return false
    } else { this.setWarning('OK'); }

    this.authService.login(this.user)
      .subscribe(
      (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/user']);
      },(err) => {
        console.log('Auth error: ', err.message);
        this.setWarning('wrong')})
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authService.isAuth()) { this.router.navigate(['/user']); }
    this.authService.checkTokenValidity();
    this.setWarning('OK');
  }

}
