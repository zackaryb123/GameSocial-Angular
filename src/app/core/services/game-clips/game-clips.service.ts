import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameClipsService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  addGameClip(media, uid) {
    media.thumbnailUri = media.thumbnails[0].uri.substring(6);
    media.gameClipUri = media.gameClipUris[0].uri.substring(6);
    this.afStore.collection('clips').add({
      media
    }).then(data => {
      this.afStore.collection('users').doc(uid).collection('clips').doc(data.id).set({
        clipId: data.id,
        providerClipId: media.gameClipId
      });
    });
  }
}
