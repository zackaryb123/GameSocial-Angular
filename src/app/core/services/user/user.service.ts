import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {first, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URI, URIS} from '../../constants/server';

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
      .then(async snap => {
        return snap.docs.map(doc => doc.data());
      });
  }

  async getUserClips2(uid: string) {
    return await this.afStore.collection('users').doc(uid).collection('clips').get().toPromise()
      .then(async snap => {
        // return snap.docs.map(doc => doc.data());
        const data = snap.docs.map(doc => doc.data());
        const arrUids = data.map(item => item.id);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        return await this.http.post(`${BASE_URI}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(arrUids), {headers}).toPromise()
          .then((res: any) => {
            // const docs = res.map(i => new GameClipModule().deserialize(i));
            return res;
          }, err => {
            console.log(err);
          }).catch(err => {
            console.log(err);
          });
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
