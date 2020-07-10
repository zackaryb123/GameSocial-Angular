import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post(`${BASE_URI}/${uris.gameclips}`, JsonData, {}).toPromise();
  }

}
