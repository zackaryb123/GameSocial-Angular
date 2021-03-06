import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import {first, switchMap} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
   private afStore: AngularFirestore,
  ) {
  }

  getUser(uid: string) {
    return this.afStore.doc(`users/${uid}`).get().toPromise().then(snap => {
        return snap.data();
    });
  }
}
