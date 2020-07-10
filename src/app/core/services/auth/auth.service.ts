import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {first, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  authUser$: Observable<any>;

  constructor(
   private afAuth: AngularFireAuth,
   private afStore: AngularFirestore,
   private router: Router,
   private http: HttpClient,
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
    return this.afStore.collection('users').doc(uid).get().pipe(first()).toPromise().then(data => {
      return data.data();
    });
  }

  doMicrosoftLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.OAuthProvider('microsoft.com');
      this.afAuth.signInWithPopup(provider)
        .then(res => {
          console.log('Microsoft Res: ', res);
          this.createUser(res);
          resolve(res);
        }, err => {
          console.log('Microsoft Err: ', err);
          reject(err);
        });
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider)
      .then(res => {
        console.log('Facebook Res: ', res);
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
        this.createUser(res, value);
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

  createUser(data, value?) {
    console.log('createUser(data): ', data);
    const newUserRef = this.afStore.collection('users').doc(data.user.uid);
    newUserRef.get().toPromise().then(user => {
      if (!user.exists) {
        if (data.additionalUserInfo.providerId === 'microsoft.com') {
          return this.afStore.collection('users').doc(data.user.uid).set({
            avatar: 'https://firebasestorage.googleapis.com/v0/b/gamesocial-zb.appspot.com/o/avatar.jpg?alt=media&token=a63d8d23-041c-4021-bb68-742bd0a95160',
            bio: '',
            name: data.additionalUserInfo.profile.displayName,
            tag: '',
            uid: data.user.uid,
            providerId: data.additionalUserInfo.profile.id,
            provider: data.additionalUserInfo.providerId
          });
        } else {
          return this.afStore.collection('users').doc(data.user.uid).set({
            avatar: 'https://firebasestorage.googleapis.com/v0/b/gamesocial-zb.appspot.com/o/avatar.jpg?alt=media&token=a63d8d23-041c-4021-bb68-742bd0a95160',
            bio: '',
            name: value.name,
            tag: value.username,
            uid: data.user.uid,
            provider: data.additionalUserInfo.providerId
          });
        }
      }
    });
  }
}
