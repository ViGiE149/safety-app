import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email = '';
  password = '';
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async login() {
    const loader = await this.loadingController.create({
      message: 'Signing in',
      cssClass: 'custom-loader-class',
    });
    await loader.present();

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        loader.dismiss();
        this.navCtrl.navigateForward('/dashboard-admin');
        this.presentToast();
      })
      .catch((error: any) => {
        loader.dismiss();
        console.error('Login error:', error);
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED IN!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
