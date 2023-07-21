import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  email="";

  constructor(private router:Router, private auth:AngularFireAuth) { }
  ngOnInit() {}

   resetPassword() {
    this.auth.sendPasswordResetEmail(this.email)
      .then(() => {
        console.log('Password reset email sent successfully');
        // Add any additional logic (e.g., show success message)
        this.router.navigateByUrl("/login");
      })
      .catch((error:any) => {
        console.error('Reset password error:', error);
        // Handle error message and display to the user
      });
  }
}
