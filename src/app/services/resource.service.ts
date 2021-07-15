import { Resources } from './../models/resources.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';


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
  banners = {
    "Medicina": "https://hospitalveugenia.com/wp-content/uploads/2015/10/Videos-de-salud-Vimeo-Hospital-Victoria-Eugenia-Sevilla-1280x720.jpg",
    "Enfermiria": "http://blogs.upn.edu.pe/salud/wp-content/uploads/sites/7/2016/11/upn_blog_sal_tareas-profesionales-enfermer%C3%ADa_28-nov.jpg",
    "Contabilidad": "https://www.certus.edu.pe/blog/wp-content/uploads/2019/01/Contabilidad-empezar-tu-carrera-CERTUS-1200x720.jpg",
    "Derecho": "https://concepto.de/wp-content/uploads/2012/03/derecho-ley-e1552664252875.jpg",
    "Electronica y Telecomunicaciones": "https://concepto.de/wp-content/uploads/2018/08/electronica-estudios-e1534781588887.jpg",
    "Sistemas Informaticos y computacion": "https://www.galdon.com/wp-content/uploads/2013/05/profesion-informatica-galdon-software-1024x576.jpg"
  };

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true));
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

  findAllMultimedia() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('type', '==', 'Video').where('isPublic', '==', false));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }


  findResourceByID(id: string) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    return this.resourcesCollection.doc(id).valueChanges();
  }

  addResource(resource: Resources) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    console.log(resource.category);
    resource.creationDate = new Date();
    resource.banner = this.banners[resource.category];
    resource.isPublic = false;
    resource.avgCalification = 0;
    resource.califications = [];
    this.resourcesCollection.add(resource);
  }

  updateResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.update(resource);
  }

  publicResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    resource.isPublic = true
    this.resourcesDocument.update(resource);
  }


  deleteResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.delete();

  }

  onUpload(resource: Resources, e: any) {

    if (e) {
      const id = Math.random().toString(36).substring(2);
      resource.resourceName = id;
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
      if (resource.type == "Video") {
        console.log(resource.url);
        this.addResource(resource)
      } else {
        console.log("ERRROR SE DEBE CARGAR UN URL")
      }
    }
  }

  //============================
  // FILTROS DE LOS RECURSOS
  //============================


  findAllResourcesIsNoPublic() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', false));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByCategory(category: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('category', '==', category).where('isPublic', '==', true));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByTitle(title: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.orderBy("title").startAt(title).endAt(title + '\uf8ff'));
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
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where("keywords", "array-contains", keyword).where('isPublic', '==', true));
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
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true).orderBy('creationDate', 'desc').limit(8));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.resources;
  }

  findAllResourcesOrderByCalification() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true).orderBy('avgCalification', 'desc').limit(8));
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
