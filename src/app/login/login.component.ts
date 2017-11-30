import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  token: any = "";

login() {
  console.log(this.user);
  this.authService.login(this.user);
}

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
