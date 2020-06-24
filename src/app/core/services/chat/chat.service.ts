import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import {first, map, switchMap} from 'rxjs/operators';
import {IMessage, MessageModel} from '../../models/chat.model';
import {AppService} from '../app/app.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from '../presence/presence.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private appService: AppService
  ) {}

  watchChat(chatId) {
    return this.afStore
      .collection<any>('chats')
      .doc(chatId)
      .valueChanges()
      .pipe(
        map((doc: any) => {
          return doc;
          // return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  getChat(chatId) {
    return this.afStore.collection<any>('chats')
      .doc(chatId).get().toPromise();
  }

  async start(friendId, chatId) {
    const {uid} = await this.afAuth.user.pipe(first()).toPromise();
    this.appService.setChatId(chatId);

    const data = {
      uids: [
        uid,
        friendId
      ],
      timeStamp: Date.now(),
      count: 0,
      messages: []
    };

    const chatRef = this.afStore.collection('chats').doc(chatId);

    this.setUserChatTracker(uid, friendId, chatId);

    // Set chat session in database
    await chatRef.get().toPromise().then(
      chat => {
        if (!chat.exists) {
          return chatRef.set(data);
        }
      }
    );
  }

  async sendMessage(friendId, chatId, message) {
    console.log('sendMessage friendId: ', friendId);
    const {uid} = await this.afAuth.user.pipe(first()).toPromise();
    const data: IMessage = {
      uid,
      message,
      timeStamp: Date.now()
    };
    if (chatId) {
      const ref = this.afStore.collection('chats').doc(chatId);

      this.updateUserChatTracker(uid, friendId, chatId);

      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  createChatId(uid1, uid2) {
    const firstUid = uid1 > uid2 ? uid1 : uid2;
    const secondUid = uid1 > uid2 ? uid2 : uid1;

    const result = [firstUid.split(''), secondUid.split('')]
      .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
      .reduce((a, b) => a.concat(b));

    return result.join('');
  }

  setUserChatTracker(authUid, friendUid, chatId) {
    const authUserRef = this.afStore.collection('users').doc(authUid).collection('chats').doc(chatId);
    const friendUserRef = this.afStore.collection('users').doc(friendUid).collection('chats').doc(chatId);
    const date = Date.now();

    // To Track chat auth user notifications
    authUserRef.get().toPromise().then(
      chat => {
        if (!chat.exists) {
          // Set timestamp for tracking
          return authUserRef.set({
            id: chatId,
            lastChecked: date,
            lastUpdated: date
          });
        } else {
          // Only update auth user timestamp (new chats read)
          return authUserRef.update({
            lastChecked: date
          });
        }
      }
    );

    // To Track friend chat notifications
    friendUserRef.get().toPromise().then(
      chat => {
        if (!chat.exists) {
          // Set timestamp for tracking
          return friendUserRef.set({
            id: chatId,
            lastChecked: date,
            lastUpdated: date
          });
        }
      }
    );
  }

  updateUserChatTracker(authUid, friendUid, chatId) {
    const authUserRef = this.afStore.collection('users').doc(authUid).collection('chats').doc(chatId);
    const friendUserRef = this.afStore.collection('users').doc(friendUid).collection('chats').doc(chatId);
    // To Track friend chat notifications
    const date = Date.now();
    friendUserRef.get().toPromise().then(
      chat => {
        if (chat.exists) {
          // Set timestamp for tracking
          return friendUserRef.update({
            lastUpdated: date
          });
        }
      }
    );
    authUserRef.get().toPromise().then(
      chat => {
        if (chat.exists) {
          return authUserRef.update({
            lastChecked: date
          });
        }
      }
    );
  }

}
