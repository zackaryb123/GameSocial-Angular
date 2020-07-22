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
    this.afStore.collection('clips').add({
      ...media,
      uid
    }).then(data => {
      this.afStore.collection('clips').doc(data.id).update({
        id: data.id
      });
      this.afStore.collection('users').doc(uid).collection('clips').doc(data.id).set({
        xuid: media.xuid,
        scid: media.scid,
        gameClipId: media.gameClipId,
        id: data.id,
        uid
      });
    });
  }
}
