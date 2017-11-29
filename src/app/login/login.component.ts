import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  token: any = "";

  getUserDetails(token) {
    this.http.post('http://localhost:8011/login', {acess_token: token, pwd: this.user.password})
      .subscribe(
      data => { return data },
      err => { console.log(err) });
  };

  login() {
    this.http.post('http://localhost:8011/login/auth', this.user)
      .subscribe(
      data => {
      this.token = data;
        this.user = this.getUserDetails(this.token);
      },
      err => { console.log(err) });
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
