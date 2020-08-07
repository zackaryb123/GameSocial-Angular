import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URI, URIS} from '../../constants/server';

@Injectable({
  providedIn: 'root'
})
export class GameClipsService {
  userGameClips$: Observable<any>;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
  ) {
    this.watchUserGameClips();
  }

  watchUserGameClips() {
    this.userGameClips$ = this.afAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.afStore.doc<any>(`users/${auth.uid}`).collection('clips').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUserGameClipsPromise(authId) {
    return this.afStore.collection(`users/${authId}/clips`).get().toPromise().then(snap => {
      return snap.docs.map(clip => clip.data());
    });
  }

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

  removeGameClip(authId, clipId) {
    this.afStore.doc(`users/${authId}/clips/${clipId}`).delete();
    this.afStore.doc(`clips/${clipId}`).delete();
  }

  async getUserClipsServer(uid: string) {
    return await this.afStore.collection('users').doc(uid).collection('clips').get().toPromise()
      .then(async snap => {
        const data = snap.docs.map(doc => doc.data());
        const arrUids = data.map(item => item.id);
        return await this.http.post(`${BASE_URI}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(arrUids), {headers: this.headers}).toPromise()
          .then((res: any) => {
            return res;
          }, err => {
            console.log(err);
          }).catch(err => {
            console.log(err);
          });
      });
  }

  async getListClipsServer(clipsArr: any[]) {
    console.log('clipsArr: ', clipsArr);
    return await this.http.post(`${BASE_URI}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(clipsArr), {headers: this.headers}).toPromise()
      .then((res: any) => {
        return res;
      }, err => {
        console.log(err);
      }).catch(err => {
        console.log(err);
      });
  }

  getExploreClips(uid: string) {
    const expClipSize = 3;
    return this.afStore.collection('users').doc(uid).collection('clips').get().toPromise().then(async userClips => {
      const clips = userClips.docs.map(item => item.data());
      const userClipsArr = [];
      for (let i = 0; i < expClipSize; i++) {
        if (!userClipsArr.includes(clips[i])) {
          userClipsArr.push(clips[Math.floor(Math.random() * clips.length)]);
        }
      }
      const clipsArr = [];
      for (let i = 0; i < userClipsArr.length; i++) {
        await this.getGameClip(userClipsArr[i].id).then(clip => {
          clipsArr.push(clip);
        });
      }
      console.log('clipsArr: ', clipsArr);
      return clipsArr;
    });
  }
}
