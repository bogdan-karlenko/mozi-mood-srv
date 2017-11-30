import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getUserDetails(token, secret) {
    return this.http.post('http://localhost:8011/login', { acess_token: token, secret: secret })
      .subscribe(
      data => { return data }, //return data from Observable?
      err => { console.log(err) });
  };

  login(credentials) {
    this.http.post('http://localhost:8011/login/auth', credentials)
      .subscribe(
      token => {
        this.getUserDetails(token, credentials.password);
        console.log(user);
      },
      err => { console.log(err) });
  }
}
