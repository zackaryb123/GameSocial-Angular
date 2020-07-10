import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GameClipNode} from '../../../interfaces/xbox.interfaces';
import axios, {AxiosRequestConfig} from 'axios';

const BASE_URI = 'http://localhost:3000';

const uris = {
  gameclips: 'xboxlive/clips',
};

@Injectable()
export class XboxService {
  constructor(
    private http: HttpClient
  ) {}

  getGameClips(gamertag: string) {
    const JsonData = JSON.stringify({gamertagOrXUID: gamertag});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    });
    // h.set('Accept', 'application/json');
    // h.set('Content-Type', 'application/json');
    // h.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${BASE_URI}/${uris.gameclips}`, JsonData, {headers}).toPromise().then((data: GameClipNode[]) => {
      console.log(data);
      return data;
    }, (err) => {
      console.log('ONREJECT ERROR: ', err);
      return err;
    }).catch(err => {
      console.log('ERROR: ', err);
      return err;
    });
  }

}
