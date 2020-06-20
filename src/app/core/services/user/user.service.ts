import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
   public afStore: AngularFirestore,
   public afAuth: AngularFireAuth
  ) {
  }

  async getUser(uid: string) {
    return await this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise()
      .then( data => {
        return data.data();
    });
  }

  // async getUser(uid: string) {
  //    const {data} = await this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise();
  //    console.log('{data}: ', data);
  // }
}
