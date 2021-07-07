import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calification } from '../models/calificationinterace';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {
  calificationCollection: AngularFirestoreCollection;
  COLLECTION_NAME_RESOURCES = 'resources';
  COLLECTION_NAME_CALIFICATION = 'calification';
  califications: Observable<Calification[]>;
  constructor(private db: AngularFirestore) { }

  addCalification(calification: Calification , resourceID: string) {
    this.calificationCollection = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_CALIFICATION);
    //this.calificationCollection.add(calification);
    this.calificationCollection.doc(calification.user).set(calification)
  }
  getCalificationByResuorce(resourceID: string): Observable<Calification[]> {
    this.calificationCollection = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_CALIFICATION);
    this.califications = this.calificationCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Calification;
        return data;
      });
    }));
    return this.califications;
  }
  UpdateCalification(){

  }
}
