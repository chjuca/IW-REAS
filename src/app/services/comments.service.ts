import { map } from 'rxjs/operators';
import { Comments } from './../models/comments.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsCollection: AngularFirestoreCollection;
  commentsDocument: AngularFirestoreDocument;
  comments: Observable<Comments[]>;
  comment = {} as Comments;
  COLLECTION_NAME_RESOURCES = 'resources';
  COLLECTION_NAME_COMMENTS = 'comments';

  constructor(private db: AngularFirestore) {
  }

  getCommentsByResource(resourceID: string): Observable<Comments[]> {
    this.commentsCollection = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_COMMENTS);
    this.comments = this.commentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Comments;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.comments;
  }

  addComment(comment: Comments, resourceID: string) {

    this.commentsCollection = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_COMMENTS);
    comment.creationDate = new Date();
    this.commentsCollection.add(comment);
  }

  updateComment(comment: Comments, resourceID: string) {
    this.commentsDocument = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_COMMENTS).doc(`${comment.id}`);
    this.commentsDocument.update(comment);
  }


  deleteResource(comment: Comments, resourceID: string) {
    this.commentsDocument = this.db.collection(this.COLLECTION_NAME_RESOURCES).doc(resourceID).collection(this.COLLECTION_NAME_COMMENTS).doc(`${comment.id}`);
    this.commentsDocument.delete();

  }

}
