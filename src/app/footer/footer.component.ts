import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class AppFooterComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  logOut() {
    this.authService.logOut();
  }

  ngOnInit() {
  }

}
