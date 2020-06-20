import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {first, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthService {

  authUser$: Observable<any>;

  constructor(
   private afAuth: AngularFireAuth,
   private afStore: AngularFirestore,
   private router: Router
  ) {
    this.watchAuthUser();
  }

  watchAuthUser() {
    this.authUser$ = this.afAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.afStore.collection('users').doc(auth.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  onAuthStateChanged() {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getAuth() {
    return this.afAuth.user.pipe(first()).toPromise();
  }

  async getAuthUser() {
    const {uid} = await this.getAuth();
    return await this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise().then(data => {
      return data.data();
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      // firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(async res => {
        const user = await this.afStore.collection('users').doc(res.user.uid).get();
        console.log('user: ', user);
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut().then(data => {
        resolve(data);
      }).catch(error => {
          console.log('doLogout: fail: ', error);
          reject(error);
        });
    });
  }
}
