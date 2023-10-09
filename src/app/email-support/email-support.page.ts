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
      to_email: 'recipient@example.com', // Replace with the recipient's email address
      subject: this.emailSubject,
      message: this.emailMessage,
    };

    emailjs.send(
      'your_emailjs_service_id',
      'your_emailjs_template_id',
      templateParams,
      'your_emailjs_user_id'
    ).then(
      (response: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response);
        // Handle success, e.g., show a success message to the user
      },
      (error :any) => {
        console.error('Email failed to send:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }







}
