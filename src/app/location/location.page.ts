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
export class LocationPage implements OnInit, OnDestroy {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  watchId: any | undefined;
  tableData: any;

  constructor(private db:AngularFirestore,private router:Router,private auth:AngularFireAuth) {
    this.getDeviceData();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // Stop watching for location changes when the component is destroyed
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  ionViewDidEnter() {
    this.createMap();
    this.watchLocation();
  }

  async createMap() {
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
    try {
      const watchOptions = {
        enableHighAccuracy:this.tableData.accuracy,
        timeout: 5000,
      };

      // Watch for changes in position and update the map
      this.watchId = Geolocation.watchPosition(watchOptions, (position: any) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Update the map with the new position
       // this.newMap.setCamera( lat );
     

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
