import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.page.html',
  styleUrls: ['./communities.page.scss'],
})
export class CommunitiesPage implements OnInit {

  groups!: Observable<any[]>;
  constructor(private db: AngularFirestore, private router: Router) {}


  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groups = this.db.collection('groups').valueChanges();
  }

  joinGroup(groupId: string) {
    // Replace 'user123' with the actual user ID
    const userId = 'user123';

    // Add the user to the group in db
    this.db
      .collection(`groups/${groupId}/members`)
      .doc(userId)
      .set({
        joinedAt: new Date(),
      })
      .then(() => {
        this.router.navigate(['/chat', { groupId }]);
      })
      .catch((error) => console.error('Error joining group:', error));
  }
}
