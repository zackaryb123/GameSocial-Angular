import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import {first, map, switchMap} from 'rxjs/operators';
import {IMessage, MessageModel} from '../../models/chat.model';
import {AppService} from '../app/app.service';
import {AngularFireAuth} from '@angular/fire/auth';


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

  get(chatId) {
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

  async start(friendId) {
    const {uid} = await this.afAuth.user.pipe(first()).toPromise();
    const chatId = this.createChatId(uid, friendId);
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

    await chatRef.get().toPromise().then(
      chat => {
        if (!chat.exists) {
          return chatRef.set(data);
        }
      }
    );
  }

  async sendMessage(chatId, message) {
    const {uid} = await this.afAuth.user.pipe(first()).toPromise();
    const data: IMessage = {
      uid,
      message,
      timeStamp: Date.now()
    };
    if (chatId) {
      const ref = this.afStore.collection('chats').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  // joinUsers(chat$: Observable<any>) {
  //   let chat;
  //   const joinKeys = {};
  //
  //   return chat$.pipe(
  //     switchMap(c => {
  //       // Unique User IDs
  //       chat = c;
  //       const uids = Array.from(new Set(c.messages.map(v => v.uid)));
  //
  //       // Firestore User Doc Reads
  //       const userDocs = uids.map(u =>
  //         this.afs.doc(`users/${u}`).valueChanges()
  //       );
  //
  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).uid] = v));
  //       chat.messages = chat.messages.map(v => {
  //         return { ...v, user: joinKeys[v.uid] };
  //       });
  //
  //       return chat;
  //     })
  //   );
  // }

  createChatId(uid1, uid2) {
    const firstUid = uid1 > uid2 ? uid1 : uid2;
    const secondUid = uid1 > uid2 ? uid2 : uid1;

    const result = [firstUid.split(''), secondUid.split('')]
      .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
      .reduce((a, b) => a.concat(b));

    return result.join('');
  }

}
