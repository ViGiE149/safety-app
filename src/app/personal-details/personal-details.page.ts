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
  directions = ['top', 'end', 'bottom', 'start'];

  getColor(direction: string): string {
    // Define your logic to set color based on direction
    // For example, return different colors for each direction
    return direction === 'top' ? 'primary' : 'secondary';
  }

  getIcon(direction: string): string {
    // Define your logic to set icon based on direction
    // For example, return different icons for each direction
    return direction === 'top' ? 'arrow-up' : 'arrow-forward';
  }
  constructor() { }

  ngOnInit() {
  }

}
