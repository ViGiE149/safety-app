import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {

  constructor(private db:AngularFirestore,private auth:AngularFireAuth) { 
    //this.retrieveMedicalInfo();
 }

  
  fullName: any;
  gender: any;
  // Add variables for other details like ID number, language, race, etc.
  nextOfKinName: any;
  nextOfKinNumber: any;

  ngOnInit() {
    // Retrieve data when the component is initialized
    this.retrieveProfileData();
  }

  async saveProfile() {
    const profileData = {
      fullName: this.fullName,
      gender: this.gender,
      nextOfKinName: this.nextOfKinName,
      nextOfKinNumber: this.nextOfKinNumber,
    };

    // Save profile data to Firestore
    const user = await this.auth.currentUser;

    if (user?.email) {
    this.db.collection('users').doc(user.email).update(profileData)
      .then(() => {
        console.log('Profile Saved Successfully');
      })
      .catch(error => {
        console.error('Error saving profile: ', error);
      });
    } else {
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }

 
}


  async retrieveProfileData() {
  // Retrieve profile data from Firestore
  const user = await this.auth.currentUser;

  if (user?.email) {
  this.db.collection('users').doc(user.email).valueChanges().subscribe((data:any) => {
    if (data) {
      this.fullName = data.fullName;
      this.gender = data.gender;
      this.nextOfKinName = data.nextOfKinName;
      this.nextOfKinNumber = data.nextOfKinNumber;
    }
  });
}
else {
  // Handle the case when the user is not logged in
  console.warn('User not logged in');
}
}
}