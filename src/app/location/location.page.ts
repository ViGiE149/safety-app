import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('map')mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap ;
  lat:any;

  long:any;

 
   constructor() {
// this.getGeoLocation();
   }

  ngOnInit() {
  }

ionViewDidEnter(){
  this.createMap();
}

async createMap() {
  try {
    const geolocation = await Geolocation.getCurrentPosition({
      timeout: 1000,
      enableHighAccuracy: true,
    });

    // Retrieve latitude and longitude from the geolocation result
    const lat = geolocation.coords.latitude;
    const long = geolocation.coords.longitude;

    const marker: Marker = {
      coordinate: {
        lat: lat,
        lng: long,
      }
    };

    // Create the Google Map
    this.newMap = await GoogleMap.create({
      id: 'map-o',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsApiKey,
      //forceCreate: true,
      config: {
        center: {
          lat: lat,
          lng: long,
        },
        zoom: 8,
      },
    });

    // Add the marker to the map
    await this.newMap.addMarker(marker);
  } catch (error) {
    console.error('Error getting geolocation:', error);
  }
}












 

//   async createMap() {


   

//     this.newMap = await GoogleMap.create({
//       id: 'map-o',
//       element:  this.mapRef.nativeElement,
//       apiKey: environment.mapsApiKey,
//       forceCreate:true,
//       config: {
//         center: {
//           lat:  [`${this.lat}`].
//           lng:this.long,
//         },
//         zoom: 8,
//       },
//     });
//   }

// getGeoLocation(){
//   Geolocation.getCurrentPosition({
//     timeout:1000,
//     enableHighAccuracy:true
//   }).then(res =>{
//     console.log(res);
//     this.lat=res.coords.altitude;
//     this.long=res.coords.longitude;
//   })
  
// }


}
