import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthenticationService
  ) { }

  title = 'app';

 isAuthenticated = (localStorage.getItem('isAuthenticated') !== null);

 logOut() {
   this.authService.logOut();
 }
}
