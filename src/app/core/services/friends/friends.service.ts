import { Injectable } from '@angular/core';
import {first, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class FriendsService {
  friends$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
  ) {
    this.watchFriends();
  }

  watchFriends() {
    this.friends$ = this.afAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.afStore.doc<any>(`users/${auth.uid}`).collection('friends').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getFriends() {
    return this.friends$.pipe(first()).toPromise();
  }

  getUserFriends(uid: string) {
    return this.afStore.collection('users').doc(uid).collection('friends').get().pipe(first()).toPromise()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }

  // removeFriend(friend: any) {
  //   this.store.dispatch(new friendsStore.RemoveFriend(friend));
  // }
  //
  // selectFriend(friend) {
  //   this.store.dispatch(new friendsStore.SelectFriend(friend));
  // }
  //
  // updateFriendFilter(filter: string) {
  //   this.store.dispatch(new friendsStore.FilterChange(filter));
  // }
  //
  // getCurrentFriend() {
  //   return this.selectedFriend.pipe(take(1)).subscribe(data => {
  //     return data;
  //   });
  // }
}
