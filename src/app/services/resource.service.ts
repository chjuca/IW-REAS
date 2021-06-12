import { Resources } from './../models/resources.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  uploadPercent: Observable<number>;
  resourcesCollection: AngularFirestoreCollection;
  resourcesDocument: AngularFirestoreDocument;
  resources: Observable<Resources[]>;
  resource = {} as Resources;
  COLLECTION_NAME = 'resources'


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  findAllResources() {
    return this.resources;
  }

  findResourceByID(id: string) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    return this.resourcesCollection.doc(id).valueChanges();
  }

  addResource(resource: Resources) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    resource.creationDate = new Date();
    this.resourcesCollection.add(resource);
  }

  updateResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.update(resource);
  }


  deleteResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.delete();

  }

  onUpload(resource: Resources, e: any) {

    if (e) {
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = `resources/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(urlFile => {
          resource.url = urlFile;
          (resource.id) ? this.updateResource(resource) : this.addResource(resource);
        });
      })
      ).subscribe();
    } else {
      console.log("ERRRROR, debe agregar un recurso educativo")
    }
  }

  //============================
  // FILTROS DE LOS RECURSOS
  //============================

  findAllResourcesByCategory(category: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('category', '==', category));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByKeyword(keyword: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where("keywords", "array-contains", keyword));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllresourcesOrderByCreatedAt() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.orderBy('creationDate', 'desc').limit(5));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.resources;
  }

}
