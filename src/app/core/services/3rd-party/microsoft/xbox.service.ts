import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GameClipNode} from '../../../interfaces/xbox.interfaces';
import {BASE_URI, URIS} from '../../../constants/server';

@Injectable()
export class XboxService {
  constructor(
    private http: HttpClient
  ) {}

  getXboxGameClips(gamertag: string, continuationToken?: string) {
    const JsonData = JSON.stringify({gamertagOrXUID: gamertag, continuationToken});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${BASE_URI}/${URIS.XBOX_GAME_CLIPS}`, JsonData, {headers}).toPromise().then((data: GameClipNode[]) => {
      return data;
    }, (err) => {
      console.log('ON REJECT ERROR: ', err);
      return err;
    }).catch(err => {
      console.log('CATCH ERROR: ', err);
      return err;
    });
  }

  getXboxGameClip(gamertag: string, sid: string, gameId: string) {
    console.log(gamertag, sid, gameId);
    const JsonData = JSON.stringify({gamertagOrXUID: gamertag, scid: sid, gameClipId: gameId});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${BASE_URI}/${URIS.XBOX_GAME_CLIP}`, JsonData, {headers}).toPromise().then((data: GameClipNode) => {
      return data;
    }, (err) => {
      console.log('ON REJECT ERROR: ', err);
      return err;
    }).catch(err => {
      console.log('CATCH ERROR: ', err);
      return err;
    });
  }

  linkXboxAccount(values: any) {
    const JsonData = JSON.stringify(values);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${BASE_URI}/${URIS.XBOX_LINK_ACCOUNT}`, JsonData, {headers}).toPromise().then((data: any) => {
      console.log(data);
      return data;
    }, (err) => {
      console.log('ON REJECT ERROR: ', err);
      return err;
    }).catch(err => {
      console.log('CATCH ERROR: ', err);
      return err;
    });
  }

  syncAccount(user: any) {
    const JsonData = JSON.stringify({uid: user.uid, gamertag: user.gamertag});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${BASE_URI}/${URIS.XBOX_SYNC_ACCOUNT}`, JsonData, {headers}).toPromise().then((data: any) => {
      console.log(data);
      return data;
    }, (err) => {
      console.log('ON REJECT ERROR: ', err);
      return err;
    }).catch(err => {
      console.log('CATCH ERROR: ', err);
      return err;
    });
  }
}
