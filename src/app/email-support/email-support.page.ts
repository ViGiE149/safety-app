import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-email-support',
  templateUrl: './email-support.page.html',
  styleUrls: ['./email-support.page.scss'],
})
export class EmailSupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  emailSubject: string = '';
  emailMessage: string = '';

  sendEmail(): void {
    const templateParams = {
      to_email: 'lethokuhleandile08@gmail.com', // Replace with the recipient's email address
      subject: this.emailSubject,
      message: this.emailMessage,
    };

    emailjs.send(
      'service_iht2ej9',
      'template_4x42kil',
      templateParams,
      'sdec_-eHbbd95KUHJ'
    ).then(
      (response: EmailJSResponseStatus) => {
      alert('Email sent successfully');
        // Handle success, e.g., show a success message to the user
      },
      (error :any) => {
        console.error('Email failed to send:', error);
        // Handle error, e.g., show an error message to the user
        alert(console.error);
      }
    );
  }






}
