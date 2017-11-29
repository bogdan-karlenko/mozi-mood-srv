import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  user = {
    name: 'Bill',
    age: '32',
    sex: 'Male'
}

  constructor() { }

  ngOnInit() {
  }

}
