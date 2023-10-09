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
  constructor(private db:AngularFirestore,private router:Router,private auth:AngularFireAuth) {this.getUser(); }

  ngOnInit() {
  }

  async shareWithFriends(){
    await Share.share({
      title: 'Stay Safe',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });



  }

  goToFaq(){
   
      this.router.navigateByUrl ('/faq');
  
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

  callNumber(): void {
    const phoneNumber = '0783648665'; // Replace with your actual phone number
    window.location.href = `tel:${phoneNumber}`;
  }

  async getUser() {
    const user = await this.auth.currentUser;

    if (user) {
      this.userSubscription = this.db.collection('users', ref => ref.where('email', '==', user.email))
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
  
  ngOnDestroy() {
    // Unsubscribe from the observable when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
