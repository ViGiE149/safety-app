import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  timerValue: number;
  timerRunning: boolean = false;
  timerInterval: any;

  constructor() {
    this.timerValue = 0;
   }

  ngOnInit() {
  }
  
  
  startTimer() {
    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      this.timerValue++;
      if (this.timerValue === 10) { // Change 10 to the desired time limit in seconds
        this.stopTimer();
        //this.sendEmail();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerRunning = false;
  }

  // sendEmail() {
  //   const emailParams = {
  //     to_email: 'recipient@example.com', // Replace with the recipient's email address
  //     subject: 'Time Expired',
  //     message: 'The timer has expired.',
  //   };

  //   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_USER_ID')
  //     .then(() => {
  //       console.log('Email sent successfully');
  //     }, (error) => {
  //       console.error('Error sending email:', error);
  //     });
  // }
}
