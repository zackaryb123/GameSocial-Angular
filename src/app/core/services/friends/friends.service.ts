import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';
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
    private store: Store<GameSocialState>,
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
