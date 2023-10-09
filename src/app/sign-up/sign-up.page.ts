import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';
  profilePicture = '';
  profilePictureUrl='';

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private db: AngularFirestore
  ) {}

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }

  register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      // Handle password mismatch
      return;
    }

    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential) => {
        const loader = await this.loadingController.create({
          message: 'Registring YOU...',
          cssClass: 'custom-loader-class',
        });
        await loader.present();

        this.db
          .collection('users').doc(this.email)
          .set({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
          
          })
          .then(() => {
            loader.dismiss();
            this.navCtrl.navigateForward('/sign-in');
          })
          .catch((error) => {
            loader.dismiss();
            console.error('Error adding document: ', error);
          
          });
      })
      .catch((error: any) => {
        console.error('Registration error:', error);
      });
  }
}
