import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticationService {

  public currentToken: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { this.currentToken = localStorage.getItem('currentToken'); }

  //currentToken: {token: string} = {token: ''};

  getUserDetails(token) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8011/users',
        {
          headers:
            new HttpHeaders().set(
              'Authorization',
              JSON.stringify({ token })
            )
        })
        .subscribe(
        //401 doesn't throw an error here
        data => {
          //console.log('response: ', data)
          resolve(data);
        },
        err => {
          console.log('err: ', err);
          reject(err)
        });
    })
  }

  isAuth() {
    return (!!this.currentToken));
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8011/login/auth', credentials)
        .subscribe(
        token => {
          this.currentToken = JSON.stringify(token);
          localStorage.setItem('currentToken', JSON.stringify(token));
          this.getUserDetails(token)
            .then((user) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              resolve();
            })
            .catch((err) => {
              console.log(err);
            })
        },
        err => { console.log(err); reject(err); });
    })
  }

  logOut(): void {
    localStorage.clear();
    this.currentToken = null;
    this.router.navigate(['/']);
  }
}
