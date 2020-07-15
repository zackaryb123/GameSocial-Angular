import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GameClipNode} from '../../../interfaces/xbox.interfaces';
import {BASE_URI, URIS} from '../../../constants/server';

@Injectable()
export class XboxService {
  constructor(
    private http: HttpClient
  ) {}

  getXboxGameClips(gamertag: string) {
    const JsonData = JSON.stringify({gamertagOrXUID: gamertag});
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

}
