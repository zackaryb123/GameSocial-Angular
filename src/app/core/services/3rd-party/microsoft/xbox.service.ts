import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticateResponse} from '../../../interfaces/microsoft.interface';

const BASE_URI = 'http://localhost:3000';

const uris = {
  gameclips: 'xboxlive/clips',
  authenticate: 'microsoft/authenticate'
};

@Injectable()
export class XboxService {
  constructor(private http: HttpClient) {
  }

  getGameClips(auth: AuthenticateResponse) {
    return this.http.post(`${BASE_URI}/${uris.authenticate}`, auth, {}).toPromise();
  }

}
