import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {URIS} from '../../constants/server';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private afStore: AngularFirestore,
    private http: HttpClient,
  ) { }

  /* ----- VIEWS ----- */

  getIPAddress() {
    return this.http.get(URIS.IP_ADDRESS);
  }

  getViewsPromise(clipId) {
    this.afStore.doc(`clips/${clipId}`).get().toPromise().then(snap => {
      return snap.data().views;
    });
  }

  getIpsPromise(clipId) {
    this.afStore.collection(`clips/${clipId}/ips`).get().toPromise().then(snap => {
      return snap.docs.map(ip => ip.data());
    });
  }

  incrementViews(clipId, ipAddress) {
    const clipRef = this.afStore.doc(`clips/${clipId}`);
    return clipRef.collection('ips').doc(ipAddress).get().toPromise().then(async snap => {
      if (!snap.exists) {
        await clipRef.collection('ips').doc(ipAddress).set({ ip: ipAddress });
        await clipRef.update({ views: firestore.FieldValue.increment(1) }).then(s => {});
        return clipRef.get().toPromise().then(s => {
          console.log('s.data().views : ', s.data().views);
          return s.data().views;
        });
      } else {
        return clipRef.get().toPromise().then(s => {
          return s.data().views;
        });
      }
    });
  }

  /* ----- LIKES ----- */

}
