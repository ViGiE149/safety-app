import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: any[] = [];
  newName: string = '';
  newEmail: string = '';

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.db.collection('contacts').valueChanges().subscribe((contacts: any[]) => {
      this.contacts = contacts;
    });
  }

  addContact() {
    if (this.newName.trim() !== '' && this.newEmail.trim() !== '') {
      this.db.collection('contacts').add({
        name: this.newName,
        email: this.newEmail,
      })
        .then(() => {
          this.newName = '';
          this.newEmail = '';
          this.loadContacts(); // Refresh the contacts list
        })
        .catch((error: any) => console.error('Error adding contact:', error));
    }
  }

  deleteContact(contactId: string) {
    this.db.collection('contacts').doc(contactId).delete()
      .then(() => {
        this.loadContacts(); // Refresh the contacts list
      })
      .catch((error: any) => console.error('Error deleting contact:', error));
  }
}
