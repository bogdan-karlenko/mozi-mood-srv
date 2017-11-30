import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isAuth: boolean = false;

  getUserDetails(token, secret) {
    return this.http.post('http://localhost:8011/login', { acess_token: token, secret: secret })
      .subscribe(
      data => { localStorage.setItem('currentUser', JSON.stringify(data)); }, //return data from Observable?
      err => { console.log(err) });
  };

  login(credentials) {
    this.http.post('http://localhost:8011/login/auth', credentials)
      .subscribe(
      token => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentToken', JSON.stringify(token));
        this.getUserDetails(token, credentials.password);
      },
      err => { console.log(err); });
    // return true;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
