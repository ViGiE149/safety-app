import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  firstName: any;
  lastName:any;
  email:any;
  phoneNumber: any;
  profilePictureUrl: any;
  avatar:any;
  image: any;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  async takePicture() {
   this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    if (this.image.base64String) {
      this.avatar = `data:image/jpeg;base64,${this.image.base64String}`;
    }
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

  async getUserProfile() {
    const user = await this.auth.currentUser;
    if (user?.email) {
      this.db
        .collection('users')
        .doc(user.email)
        .valueChanges()
        .subscribe((userData: any) => {
          this.user = userData;
          this.firstName = userData.name || '';
          this.lastName = userData.lastName || '';
          this.email = user.email;
          this.phoneNumber = userData.phoneNumber || '';
          this.profilePictureUrl=userData.profilePictureUrl || '';
        });
    }

  if( this.profilePictureUrl){
  this.avatar=this.profilePictureUrl;
  }
}

  async saveProfile() {
    const loader = await this.loadingController.create({
      message: 'Saving profile...',
      cssClass: 'custom-loader-class',
    });
    await loader.present();

    if (this.profilePictureUrl !== null && this.profilePictureUrl !== undefined && this.profilePictureUrl !== "" ) {
      this.deleteFile( this.profilePictureUrl );
   }

    this.profilePictureUrl = await this.uploadImage(this.image.base64String);
    const user = await this.auth.currentUser;
    if (user?.email) {
      this.db
        .collection('users')
        .doc(user.email)
        .update({
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          profilePictureUrl:this.profilePictureUrl,
        })
        .then(() => {
          loader.dismiss();
          this.presentToast('Profile saved successfully');
        })
        .catch((error) => {
          loader.dismiss();
          console.error('Error updating profile:', error);
        });
    }
  }

  deleteFile(url: string): void {
  
    const fileRef = this.storage.refFromURL(url);
  
    fileRef
      .delete()
      .pipe(
        finalize(() => {
          console.log('File deleted:', url);
      
        })
      )
      .subscribe(
        () => {}, // Empty success callback
        (error) => {
          alert('An error occurred while deleting the file: ' + error.message);
        }
      );
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
