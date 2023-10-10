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
      this.db
        .collection('users')
        .doc(user.email)
        .update(addressData)
        .then((docRef: any) => {
          alert('saved');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    } else {
      console.warn('User not logged in');
    }
  }

  async getAddresses() {
    const user = await this.auth.currentUser;

    if (user?.email) {
      this.db
        .collection('users')
        .doc(user.email)
        .valueChanges()
        .subscribe((data: any) => {
          console.log(data);
          this.addresses=data;
          if (this.addresses) {
            // Convert the object to an array
            this.homeAddress  = this.addresses.homeAddress;
            this.workAddress =   this.addresses.workAddress;

          }
        });
    } else {
      console.warn('User not logged in');
    }
  }
  
  }


  

