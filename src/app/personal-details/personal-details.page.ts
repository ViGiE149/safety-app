import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {
  profilePicture="";
  firstName="mike";
  phoneNumber="0784951538"
  constructor() { }

  ngOnInit() {
  }

}
