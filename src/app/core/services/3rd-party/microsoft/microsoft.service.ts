import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URI = 'http://localhost:3000';

const uris = {
  gameclips: 'xboxlive/clips',
  authenticate: 'microsoft/authenticate'
};

@Injectable()
export class MicrosoftService {

  constructor(private http: HttpClient) {
  }

  getMicrosoftAuthentication(email: string, password: string) {
    return this.http.post(`${BASE_URI}/${uris.gameclips}`, {email, password}, {}).toPromise();
  }
}
