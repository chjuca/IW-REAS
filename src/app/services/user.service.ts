import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../models/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection;
  userDocument: AngularFirestoreDocument;
  users: Observable<User[]>;
  user = {} as User;
  COLLECTION_NAME = 'users'

  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection(this.COLLECTION_NAME);
    this.users = this.userCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        return data;
      });
    }));
  }

  findAllUsers() {
    return this.users;
  }

  updateRole(user: User) {
    this.userDocument = this.db.collection(this.COLLECTION_NAME).doc(`${user.email}`);
    this.userDocument.update(user);
  }

}
