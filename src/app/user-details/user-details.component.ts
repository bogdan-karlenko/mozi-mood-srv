import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isAuthenticated') === null) {
      this.router.navigate(['/login']);
    }
  }
}
