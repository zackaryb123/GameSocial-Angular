import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameClipsService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  async getGameClip(uid) {
    return await this.afStore.collection('clips').doc(uid).get().pipe(first()).toPromise().then(snap => {
      return snap.data();
    });
  }

  addGameClip(media, uid) {
    media.thumbnailUri = media.thumbnails[0].uri.substring(6);
    media.gameClipUri = media.gameClipUris[0].uri.substring(6);
    this.afStore.collection('clips').add({
      media
    }).then(data => {
      this.afStore.collection('users').doc(uid).collection('clips').doc(data.id).set({
        ...media,
        id: data.id,
        uid
      });
    });
  }
}
