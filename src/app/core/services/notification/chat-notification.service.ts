import {Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatNotificationService {

  chatNotifications$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
  ) {
    this.watchChatNotifications();
  }

  watchChatNotifications() {
    this.chatNotifications$ = this.afAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.afStore.doc<any>(`users/${auth.uid}`).collection('chats').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
