import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {first, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import OAuthCredential = firebase.auth.OAuthCredential;
// import {MsalService} from '@azure/msal-angular';

@Injectable()
export class AuthService {

  authUser$: Observable<any>;

  constructor(
   private afAuth: AngularFireAuth,
   // private msalService: MsalService,
   private afStore: AngularFirestore,
   private router: Router,
   private http: HttpClient
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

  createUser(data) {
     this.afStore.collection('users').doc(data.user.uid).set({
      avatar: 'https://firebasestorage.googleapis.com/v0/b/gamesocial-zb.appspot.com/o/avatar.jpg?alt=media&token=a63d8d23-041c-4021-bb68-742bd0a95160',
      bio: '',
      name: data.additionalUserInfo.profile.displayName,
      tag: '',
      uid: data.user.uid,
      providerId: data.additionalUserInfo.profile.id,
      provider: data.additionalUserInfo.providerId
    });
  }

  doMicrosoftLogin() {
    return new Promise<any>((resolve, reject) => {
      // TODO: Choose Msal
      // this.msalService.loginPopup()
      //     .then(res => {
      //       // this.createUser(res);
      //       console.log('Microsoft Res: ', res);
      //       resolve(res);
      //     }, err => {
      //       console.log('Microsoft Err: ', err);
      //       reject(err);
      //     }
      // );

      // TODO: Choose Firebase
      const provider = new firebase.auth.OAuthProvider('microsoft.com');
      // provider.setCustomParameters({
      //   tenant: '7cf310c1-bc89-4a58-9c3b-fd416a0d4daf'
      // });
      // provider.addScope('user.authenticate');
      provider.addScope('login.live.com');
      // provider.addScope('service::user.auth.xboxlive.com::MBI_SSL');
      // provider.addScope('xboxlive.com');
      // provider.addScope('273227eb-4db5-4ad6-a567-c4d54fac3708/Xboxlive.signin');
      // provider.addScope('api://273227eb-4db5-4ad6-a567-c4d54fac3708/Xboxlive.offline_access');
      // provider.addScope('Xbox.Services');
      this.afAuth.signInWithPopup(provider)
        .then(res => {
          // this.createUser(res);
          console.log('Microsoft Res: ', res);
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
