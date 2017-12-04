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
      (data) => {
        data.subscribe((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/user']);
        },
          (err) => {
            this.authService.errorHandler(err.status);
            //console.log(err)
          })
      },
      (err) => {
        this.authService.errorHandler(err.status);
        // console.log(err);
      })
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    //---
    const token = localStorage.getItem('currentToken');
    if (token) {
      this.authService.checkValidity(token.split('"').join(''));
    } else {
      this.authService.logOut();
    }
  //---
  if(this.authService.isAuth()) {
    this.router.navigate(['/user']);
  }
}

}
