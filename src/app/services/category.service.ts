import { map } from 'rxjs/operators';
import { Category } from './../models/category.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryCollection: AngularFirestoreCollection;
  categoryDocument: AngularFirestoreDocument;
  categories: Observable<Category[]>;
  category = {} as Category;
  COLLECTION_NAME_CATEGORIES = 'categories';
  COLLECTION_NAME_TITULATIONS = 'titulations';

  constructor(private db: AngularFirestore) { }

  getTitulationsByCategory(category: string): Observable<Category[]> {
    this.categoryCollection = this.db.collection(this.COLLECTION_NAME_CATEGORIES).doc(category).collection(this.COLLECTION_NAME_TITULATIONS);
    this.categories = this.categoryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.categories;
  }

  getCategories(): Observable<Category[]> {
    this.categoryCollection = this.db.collection(this.COLLECTION_NAME_CATEGORIES);
    this.categories = this.categoryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.categories;
  }

}
