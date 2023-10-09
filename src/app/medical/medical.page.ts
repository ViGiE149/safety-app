import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { error } from 'console';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.page.html',
  styleUrls: ['./medical.page.scss'],
})
export class MedicalPage implements OnInit {
  latestData: any;

  constructor(private db:AngularFirestore,private auth:AngularFireAuth) { 
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

  saveMedicalInfo() {
    const medicalData = {
      hasMedicalInsurance: this.hasMedicalInsurance,
      insuranceScheme: this.insuranceScheme || null,
      insurancePlan: this.insurancePlan || null,
      membershipNumber: this.membershipNumber || null,
      bloodType: this.bloodType || null,
      hasMedicalConditions: this.hasMedicalConditions,
      medicalConditions: this.medicalConditions || null,
    };

    // Upload to Firestore
    this.db.collection('users').add(medicalData)
      .then(() => {
        console.log('Medical Information Saved Successfully');
        // After saving, fetch and display the saved data
        this.retrieveMedicalInfo();
      })
      .catch((error:any) => {
        console.error('Error saving medical information: ', error);
      });
  }

  retrieveMedicalInfo() {
    // Retrieve medical information from Firestore
    this.db.collection('users').valueChanges().subscribe(data => {
      if (data.length > 0) {
       this.latestData = data[data.length - 1];
        this.hasMedicalInsurance = this.latestData.hasMedicalInsurance;
        this.insuranceScheme = this.latestData.insuranceScheme;
        this.insurancePlan = this.latestData.insurancePlan;
        this.membershipNumber = this.latestData.membershipNumber;
        this.bloodType = this.latestData.bloodType;
        this.hasMedicalConditions = this.latestData.hasMedicalConditions;
        this.medicalConditions = this.latestData.medicalConditions;
      }
    });
  }
}
