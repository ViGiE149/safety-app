import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Share } from '@capacitor/share';
import {  LoadingController,NavController, ToastController , AlertController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

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
  tableData: any;
  userSubscription: Subscription | undefined;

   getColor(direction: string): string {
  //   // Define your logic to set color based on direction
  //   // For example, return different colors for each direction
  return direction === 'top' ? 'primary' : 'secondary';
  }

  getIcon(direction: string): string {
    // Define your logic to set icon based on direction
    // For example, return different icons for each direction
    return direction === 'top' ? 'arrow-up' : 'arrow-forward';
  }
  constructor(private db:AngularFirestore,private router:Router,private auth:AngularFireAuth,private loadingController: LoadingController) {this.getUser(); }

  ngOnInit() {
  }

  async shareWithFriends(){
    await Share.share({
      title: 'Stay Safe',
      text: 'Really awesome thing you need to see right ',
      url: 'http://safetyApp.com/',
      dialogTitle: 'Share with buddies',
    });



  }

  goToFaq(){
   
      this.router.navigateByUrl ('/faq');
  
  }
  goToCheckMe(){
    this.router.navigateByUrl ('/check');
  }
  goToEmergencyInfor(){
    this.router.navigateByUrl ('/emergency-information');
  }
  goToEmailSupport(){

    this.router.navigateByUrl ('/email-support');

  }
  goToTAC(){
    this.router.navigateByUrl ('/term-and-conditions');
  }
  goToLctSettings(){
    this.router.navigateByUrl ('/location-settings');
  }

  callNumber(number:any): void {
    const phoneNumber = number; // Replace with your actual phone number
    window.location.href = `tel:${phoneNumber}`;





  }
 async report(type:any) {

    const loader = await this.loadingController.create({
      message: 'reporting...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();
    const reportData = {
      usersInfor:this.tableData,
      date:new Date(),
      reportType:type
    };
 
    // Upload to Firestore
    this.db.collection('reports').add(reportData)
      .then(() => {
        loader.dismiss()
        //console.log('Medical Information Saved Successfully');
        // After saving, fetch and display the saved data
        alert("report has been made you recieve a call shortly");
        //this.retrieveMedicalInfo();
      })
      .catch((error:any) => {
        loader.dismiss()
        console.error('Error saving medical information: ', error);
      });
  }


  async getUser() {
    const user = await this.auth.currentUser;

    if (user) {
      this.userSubscription = this.db.collection('users', ref => ref.where('email', '==', user.email))
        .valueChanges()
        .subscribe((data:any) => {
          console.log(data);
          this.tableData = data;
          this.profilePicture=this.tableData[0].profilePictureUrl;
        });
    } else {
      // Handle the case when the user is not logged in
      console.warn('User not logged in');
    }
  }
  
  ngOnDestroy() {
    // Unsubscribe from the observable when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
