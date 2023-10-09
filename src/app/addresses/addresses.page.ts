import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  addresses: any;

  constructor(private db: AngularFirestore,private auth:AngularFireAuth) {
    this.getAddresses();
  }

  ngOnInit() {
  }
  homeAddress=' ';
  workAddress=' ';

  async saveAddressInfo() {
    // Add logic to save the user's address information (e.g., send to server, store in local storage, etc.)
  
    const addressData = {
      homeAddress: this.homeAddress,
      workAddress: this.workAddress,
    };
    const user = await this.auth.currentUser;

    if (user?.email) {
    // Add logic to save the user's address information to Firestore
    this.db.collection('users').doc(user.email).update(addressData)
      .then(docRef => {
      
      alert('updated');


      this.getAddresses();

      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });}
      else {
        // Handle the case when the user is not logged in
        console.warn('User not logged in');
      }
     
  }


  getAddresses() {
    // Fetch the addresses from Firestore
    this.db.collection('users').valueChanges().subscribe((data:any) =>{
      this.addresses = data;


    });
  }
  }


  

