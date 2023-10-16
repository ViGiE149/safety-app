import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // groupId: string | undefined;
  // messages:any;
  // newMessage: string = '';
  // currentUser: any; // Assuming you have a user object

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.authService.getCurrentUser().subscribe((user: any) => {
    //   this.currentUser = user;
    // });

    // this.route.params.subscribe((params: { [x: string]: string; }) => {
    //   this.groupId = params['groupId'];
    //   this.loadMessages();
    // });
  }

  // loadMessages() {
  //   this.messages = this.firestore
  //     .collection("groups", (ref) => ref.orderBy('timestamp'))
  //     .valueChanges();
  // }

  // sendMessage() {
  //   if (this.newMessage.trim() !== '') {
  //     // Replace 'user123' with the actual user ID
  //     const userId = 'user123';
  //     //`groups/${this.groupId}/messages`
  //     // Add the message to the group's messages in Firestore
  //     this.firestore
  //       .collection('groups')
  //       .add({
  //         message: this.newMessage,
  //         userId,
  //         timestamp: new Date(),
  //       })
  //       .then(() => {
  //         this.newMessage = ''; // Clear the input field after sending the message
  //       })
  //       .catch((error) => console.error('Error sending message:', error));
  //   }
  // }
}

