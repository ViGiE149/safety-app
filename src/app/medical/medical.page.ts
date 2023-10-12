import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';
import { error } from 'console';


@Component({
  selector: 'app-medical',
  templateUrl: './medical.page.html',
  styleUrls: ['./medical.page.scss'],
})
export class MedicalPage implements OnInit {
  latestData: any;

  constructor(  private loadingController: LoadingController,private db:AngularFirestore,private auth:AngularFireAuth) { 
     this.retrieveMedicalInfo();
  }

  ngOnInit() {
  }
  hasMedicalInsurance: boolean = false;
  insuranceScheme: any;
  insurancePlan: any;
  membershipNumber: any;
  bloodType: any;
  hasMedicalConditions: boolean = false;
  medicalConditions: any;

  async saveMedicalInfo() {

    const loader = await this.loadingController.create({
      message: 'Saving medical data...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();
    const medicalData = {
      hasMedicalInsurance: this.hasMedicalInsurance,
      insuranceScheme: this.insuranceScheme || null,
      insurancePlan: this.insurancePlan || null,
      membershipNumber: this.membershipNumber || null,
      bloodType: this.bloodType || null,
      hasMedicalConditions: this.hasMedicalConditions,
      medicalConditions: this.medicalConditions || null,
    };
    const user = await this.auth.currentUser;

    if (user?.email) {
    // Upload to Firestore
    this.db.collection('users').doc(user.email).update(medicalData)
      .then(() => {
        loader.dismiss()
        console.log('Medical Information Saved Successfully');
        // After saving, fetch and display the saved data
        alert("saved");
        this.retrieveMedicalInfo();
      })
      .catch((error:any) => {
        loader.dismiss()
        console.error('Error saving medical information: ', error);
      });
    } else {
      loader.dismiss()
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }
  }

  async retrieveMedicalInfo() {


    const user = await this.auth.currentUser;

    if (user?.email) {
    // Retrieve medical information from Firestore
    this.db.collection('users').doc(user.email).valueChanges().subscribe((data:any) => {
      if (data) {
       this.latestData = data;
        this.hasMedicalInsurance = this.latestData.hasMedicalInsurance;
        this.insuranceScheme = this.latestData.insuranceScheme;
        this.insurancePlan = this.latestData.insurancePlan;
        this.membershipNumber = this.latestData.membershipNumber;
        this.bloodType = this.latestData.bloodType;
        this.hasMedicalConditions = this.latestData.hasMedicalConditions;
        this.medicalConditions = this.latestData.medicalConditions;
        console.log(this.latestData);
      }
    });

   } else {
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }



  }
}
