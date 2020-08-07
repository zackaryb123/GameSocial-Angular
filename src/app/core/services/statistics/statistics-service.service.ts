import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {URIS} from '../../constants/server';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private afStore: AngularFirestore,
    private http: HttpClient,
  ) { }

  /* ----- VIEWS ----- */

  getIPAddress() {
    return this.http.get(URIS.IP_ADDRESS);
  }

  getViewCountPromise(clipId) {
    this.afStore.doc(`clips/${clipId}`).get().toPromise().then(snap => {
      return snap.data().views;
    });
  }

  getViewsCollectionPromise(clipId) {
    this.afStore.collection(`clips/${clipId}/views`).get().toPromise().then(snap => {
      return snap.docs.map(view => view.data());
    });
  }

  incrementViews(clipId, authId) {
    const clipRef = this.afStore.doc(`clips/${clipId}`);
    return clipRef.collection('views').doc(authId).get().toPromise().then(async snap => {
      if (!snap.exists) {
        await clipRef.collection('views').doc(authId).set({ ip: authId });
        await clipRef.update({ views: firestore.FieldValue.increment(1) });
        return clipRef.get().toPromise().then(s => {
          return s.data().views;
        });
      } else {
        return clipRef.get().toPromise().then(s => {
          return s.data().views;
        });
      }
    });
  }

  /* ----- LIKES ----- */

  getLikesCountPromise(clipId) {
    this.afStore.doc(`clips/${clipId}`).get().toPromise().then(snap => {
      return snap.data().likeCount;
    });
  }

  getLikesCollectionPromise(clipId) {
    this.afStore.collection(`clips/${clipId}/likes`).get().toPromise().then(snap => {
      return snap.docs.map(like =>  like.data());
    });
  }

  isClipLiked(clipId, authId) {
    const clipRef = this.afStore.doc(`clips/${clipId}`);
    return clipRef.collection('likes').doc(authId).get().toPromise().then(snap => {
      return snap.exists;
    });
  }

  incrementLikes(clipId, authId) {
    const clipRef = this.afStore.doc(`clips/${clipId}`);
    return clipRef.collection('likes').doc(authId).set({ uid: authId }).then(async () => {
      return await clipRef.update({ likeCount: firestore.FieldValue.increment(1) });
    });
  }

  decrementLikes(clipId, authId) {
    const clipRef = this.afStore.doc(`clips/${clipId}`);
    return clipRef.collection('likes').doc(authId).delete().then(async () => {
      return await clipRef.update({ likeCount: firestore.FieldValue.increment(-1) });
    });
  }

}
