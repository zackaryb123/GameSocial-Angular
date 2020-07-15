import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {first, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URI, URIS} from '../../constants/server';
import {GameClipNode} from '../../interfaces/xbox.interfaces';
import {GameClipModule} from '../../models/xbox';

@Injectable()
export class UserService {
  userGameClips$: Observable<any>;

  constructor(
   private afStore: AngularFirestore,
   private afAuth: AngularFireAuth,
   private http: HttpClient
  ) {
    this.watchUserGameClips();
  }

  getUser(uid: string) {
    return this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise()
      .then(snap => {
        return snap.data();
    });
  }

  getUserFriends(uid: string) {
    return this.afStore.collection('users').doc(uid).collection('friends').get().pipe(first()).toPromise()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }

  async getUserClips(uid: string) {
    return await this.afStore.collection('users').doc(uid).collection('clips').get().toPromise()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      }).then(async data => {
        const arrUids = data.map(item => item.clipId);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        });
        return await this.http.post(`${BASE_URI}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(arrUids), {headers}).toPromise()
          .then((res: any) => {
            const n = new GameClipModule().deserialize(res).toJSON();
            console.log('res', n);
            return n;
        }, err => {
          console.log(err);
        }).catch(err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      }).catch(err => {
        console.log(err);
      });
  }

  async getUserClips2(uid: string) {
    return await this.afStore.collection('users').doc(uid).collection('clips').get().toPromise()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      }).then(async data => {
        const arrUids = data.map(item => item.clipId);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json'
        });
        const clips: any = await this.http.post(`${BASE_URI}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(arrUids), {headers}).toPromise();
        console.log('clips: ', clips);
        console.log(clips.map(i => i.thumbnails.data()));
        return clips;
      }, err => {
        console.log(err);
      }).catch(err => {
        console.log(err);
      });
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

  // async getUser(uid: string) {
  //    const {data} = await this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise();
  //    console.log('{data}: ', data);
  // }
}
