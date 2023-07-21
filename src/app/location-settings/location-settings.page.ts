import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-settings',
  templateUrl: './location-settings.page.html',
  styleUrls: ['./location-settings.page.scss'],
})
export class LocationSettingsPage implements OnInit {
  locationAccuracy: string = 'high';
  constructor() { }

  ngOnInit() {
  }


 // Default to 'high' accuracy

  // Handle changes to the selected accuracy level
  onLocationAccuracyChange() {
    console.log('Selected Location Accuracy:', this.locationAccuracy);
    // Here, you can update the location accuracy settings based on the user's selection.
    // You can use the Geolocation API with different options depending on the selected value.
  }
}
