import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  addresses: any;

  constructor(  private loadingController: LoadingController,private db: AngularFirestore,private auth:AngularFireAuth) {
    this.getAddresses();
  }

  ngOnInit() {
  }
  homeAddress=' ';
  workAddress=' ';

  async saveAddressInfo() {
    // Add logic to save the user's address information (e.g., send to server, store in local storage, etc.)
    const loader = await this.loadingController.create({
      message: 'Saving Addresses...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();
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
          loader.dismiss();
        })
        .catch((error) => {
          loader.dismiss();
          console.error('Error updating document: ', error);
        });
    } else {
      loader.dismiss();
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
          this.addresses = [data]; // Convert the object to an array
          if (this.addresses) {
            this.homeAddress = this.addresses[0].homeAddress;
            this.workAddress = this.addresses[0].workAddress;
          }
        });
    } else {
      console.warn('User not logged in');
    }
  }
  
  
  }


  

