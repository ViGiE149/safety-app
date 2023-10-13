import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import {  LoadingController,NavController, ToastController , AlertController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  watchId: any | undefined;
  tableData: any;
   accuracy:any;
   boolAccuracy=false;
  locationAccuracy: any;
  constructor(private db:AngularFirestore,private router:Router,private auth:AngularFireAuth) {
  
  }

   ngOnInit() {}

  ngOnDestroy() {
    // Stop watching for location changes when the component is destroyed
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }


 async getLocAccuracy(){
  const user = await this.auth.currentUser;

  if (user?.email) {
    const data = await this.db.collection('device').doc(user.email).valueChanges().toPromise();
    this.accuracy = data;
    if (this.accuracy) {
      alert(   this.accuracy)
      this.boolAccuracy = this.accuracy.accuracy;

    }
  } else {
    // Handle the case when the user is not logged in
    console.warn('User not logged in');
  }
}





  
  async ionViewDidEnter() {
    try {
    

      this.createMap();
      this.watchLocation();
    } catch (error) {
      console.error('Error in ionViewDidEnter:', error);
     // this.presentErrorAlert('Error in ionViewDidEnter');
    }
  }

  async createMap() {
    // const storedAccuracy = localStorage.getItem('locationAccuracy');
    // this.locationAccuracy = storedAccuracy !== null ? JSON.parse(storedAccuracy) : false;
    try {
      const geolocation = await Geolocation.getCurrentPosition({
        timeout: 1000,
        enableHighAccuracy: true,
      });

      const lat = geolocation.coords.latitude;
      const long = geolocation.coords.longitude;

      const marker: Marker = {
        coordinate: {
          lat: lat,
          lng: long,
        },
      };

      this.newMap = await GoogleMap.create({
        id: 'map-o',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            lat: lat,
            lng: long,
          },
          zoom: 15,
        },
      });

      await this.newMap.addMarker(marker);
    } catch (error) {
      console.error('Error getting geolocation:', error);
    }
  }

  async watchLocation() {
       const storedAccuracy = localStorage.getItem('locationAccuracy');
    this.locationAccuracy = storedAccuracy !== null ? JSON.parse(storedAccuracy) : false;
   
    try {
      const watchOptions = {
        enableHighAccuracy:true,
        timeout: 10000,
      };

      // Watch for changes in position and update the map
      this.watchId = Geolocation.watchPosition(watchOptions, async (position: any) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Update the map with the new position
       // this.newMap.setCamera( lat );
       this.newMap = await GoogleMap.create({
        id: 'map-o',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 15,
        },
      });

        // Clear existing markers and add a new one at the updated position
        //this.newMap.clear();
        this.newMap.addMarker({
          coordinate: { lat, lng },
        });
      });
    } catch (error) {
      console.error('Error watching geolocation:', error);
    }
  }
  async getDeviceData() {
    const user = await this.auth.currentUser;

    if (user?.email) {
      this.db.collection('device').doc(user?.email)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.tableData = data;
        });
    } else {
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }
  }
}
