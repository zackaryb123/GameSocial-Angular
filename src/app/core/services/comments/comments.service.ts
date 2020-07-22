import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  watchClipComments(clipId: string) {
    return this.afStore.doc<any>(`clips/${clipId}`).collection('comments').valueChanges();
  }

  addClipComment(comment: string, clipId: string, uid: string) {
    const commentsRef = this.afStore.collection('clips').doc(clipId).collection('comments');
    commentsRef.add({
      comment,
      uid,
      timeStamp: Date.now()
    }).then(data => {
      commentsRef.doc(data.id).update({ id: data.id });
    });
  }
}
