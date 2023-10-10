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
  profilePictureUrl:any;
  image: any;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  async takePicture() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    this.profilePicture = `data:image/jpeg;base64,${this.image.base64String}`;
  }

   async uploadImage(file: string) {
    const fileName = `${this.email}_`+Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);

    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;

    return snapshot.ref.getDownloadURL();
  }
  // dataURItoBlob(dataURI: string) {
  //   const byteString = atob(dataURI.split(',')[1]);
  //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);

  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ab], { type: mimeString });
  // }

  async register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      // Handle password mismatch
      return;
    }
    const loader = await this.loadingController.create({
      message: 'Registring YOU...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();
    this.profilePictureUrl = await this.uploadImage(this.image.base64String);
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential) => {
     
  
   

     await   this.db
          .collection('users')
          .doc(this.email)
          .set({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            profilePictureUrl: this.profilePictureUrl 
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
        loader.dismiss();
        console.error('Registration error:', error);
      });
  }
}
