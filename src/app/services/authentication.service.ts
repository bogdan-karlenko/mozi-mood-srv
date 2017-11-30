import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) { }

  isAuth: boolean = false;

  getUserDetails(token, secret) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8011/login',
        { acess_token: token, secret: secret },
      { headers: new HttpHeaders().set('Authorization', token) })
        .subscribe(
        data => { resolve(data); },
        err => { console.log(err); reject(err) });
    })
  }


  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8011/login/auth', credentials)
        .subscribe(
        token => {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentToken', JSON.stringify(token));
          this.getUserDetails(token, credentials.password)
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
    //ChangeDetectionRef
    //this.ngZone.run(() => {});
    this.router.navigate(['/']);
  }
}
