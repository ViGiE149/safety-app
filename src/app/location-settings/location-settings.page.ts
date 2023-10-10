import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-location-settings',
  templateUrl: './location-settings.page.html',
  styleUrls: ['./location-settings.page.scss'],
})
export class LocationSettingsPage implements OnInit {
  locationAccuracy= 'false';
  constructor(private db:AngularFirestore,private auth:AngularFireAuth) { 
    //this.retrieveMedicalInfo();
 }



  ngOnInit() {
  }


 // Default to 'high' accuracy

  // Handle changes to the selected accuracy level
  async onLocationAccuracyChange() {
    console.log('Selected Location Accuracy:', this.locationAccuracy);
    localStorage.setItem('locationAccuracy', JSON.stringify(this.locationAccuracy));
    const user = await this.auth.currentUser;
    
    if (user?.email) {
      this.db.collection('device').doc(user.email).update({
        accuracy: this.locationAccuracy
      }).then((response: any) => {
       
        // Handle success if needed
      }).catch((error: any) => {
        console.error('Error updating document:', error);
      });
    } else {
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }
  }
  

 
}
