import { Resources } from './../models/resources.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calification } from '../models/calificationinterace';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {
  calificationCollection: AngularFirestoreCollection;
  resourcesCollection: AngularFirestoreCollection;
  resourcesDocument: AngularFirestoreDocument;
  COLLECTION_NAME_RESOURCES = 'resources';
  COLLECTION_NAME_CALIFICATION = 'calification';
  califications: Observable<Calification[]>;
  constructor(private db: AngularFirestore) { }

  addCalification(calification: Calification, resource: Resources) {
    this.calificationCollection = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resource.id).collection(this.COLLECTION_NAME_CALIFICATION);
    resource.califications.push(Number(calification.value));
    let suma = 0;
    resource.califications.forEach(function (numero) {
      suma += numero;
    });
    resource.avgCalification = suma / resource.califications.length;
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(`${resource.id}`);
    this.resourcesDocument.update(resource);
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
  UpdateCalification() {

  }
}
