import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  faqs = [
    { question: 'How do I update my emergency contacts?', answer: 'Go to the app settings, select "Emergency Contacts," and update the information as needed.' },
    { question: 'Is the app available for both iOS and Android?', answer: 'Yes, the app is available on both the Apple App Store and Google Play Store.' },
    { question: 'Can I customize the emergency button on the main screen?', answer: 'Yes, you can customize the emergency button\'s behavior in the app settings.' },
    { question: 'What information is shared when I click the emergency button?', answer: 'The app shares your current location and basic user information with the selected emergency contacts or services.' },
    { question: 'Is my location tracked continuously?', answer: 'No, your location is only tracked when you click the emergency button, and it is shared for the duration of the emergency call.' },

    // Additional FAQs and answers
    { question: 'How can I reset my password?', answer: 'You can reset your password by selecting the "Forgot Password" option on the login screen.' },
    { question: 'Can I use the app without an internet connection?', answer: 'While some features may require an internet connection, the basic emergency functionality works offline, and your location will be shared once the connection is restored.' },
    { question: 'Are my emergency contacts notified when I check in as safe?', answer: 'No, your emergency contacts are only notified during an emergency when you click the emergency button.' },
    { question: 'How often should I update the app for the latest features?', answer: 'It is recommended to check for updates periodically, but major updates are usually announced in the app and through notifications.' },
    { question: 'Can I integrate the app with other safety devices?', answer: 'Currently, the app does not support direct integration with other safety devices, but future updates may include such features.' },
    // Add more FAQs as needed
  ];
}
