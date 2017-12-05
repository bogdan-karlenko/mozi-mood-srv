import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SocketService } from './../services/socket.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthenticationService {

  public currentToken: string;
  public currentUser: Object;

  constructor(
    @Inject (HttpClient) private http,
    private router: Router,
    private socket: SocketService
  ) {
  this.currentToken = localStorage.getItem('currentToken');
  }

  getUserDetails(token) {
    return this.http.get('http://localhost:8011/users',
      {
        headers:
          new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
          )
      })
  }

  isAuth() {
    return (!!this.currentToken);
  }

  // errorHandler(status) {
  //   console.log(status);
  //   if (status === 401) {
  //       this.logOut();
  //   } else {
  //     console.log('Unhandled error. Status: ', status);
  //   }
  // }

  checkValidity(token) {
    this.http.get('http://localhost:8011/login',
      {
        headers:
          new HttpHeaders().set(
            'Authorization',
            JSON.stringify({ token })
          ),
        observe: 'response',
        params: new HttpParams().set('ValidityCheck', 'true')
      })
      .subscribe((data) => { },
      (err) => {
        //this.errorHandler(err.status)
        //console.log(err);
      })
  }

  login(credentials) {
    return this.http.post('http://localhost:8011/login', credentials, {observe: 'body'})
      .do(
      (token) => {
        this.currentToken = JSON.stringify(token);
        localStorage.setItem('currentToken', JSON.stringify(token));
      })
      .switchMap((token) => { return this.getUserDetails(token) })
  }

  logOut(): void {
    localStorage.clear();
    this.currentToken = null;
    this.socket.disconnect();
    this.router.navigate(['/']);
  }
}
