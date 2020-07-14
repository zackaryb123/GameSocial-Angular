import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {first, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as firebase from "firebase";

@Injectable()
export class UserService {
  userGameClips$: Observable<any>;

  constructor(
   public afStore: AngularFirestore,
   public afAuth: AngularFireAuth
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

  getUserClips(uid: string) {
    return this.afStore.collection('users').doc(uid).collection('clips').get().pipe(first()).toPromise()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      }).then(data => {
        const arrUids = data.map(item => item.clipId);
        console.log('arrUids: ', arrUids);
        return data;
        // const getUserClips = firebase.functions().httpsCallable('addMessage');
        // getUserClips(arrUids).then((result) => {
        //   // Read result of the Cloud Function.
        //   console.log('result: ', result.data);
        // }).catch(err => {
        //   console.log(err);
        // });
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
