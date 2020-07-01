import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import axios, {AxiosRequestConfig} from 'axios';
import {
  ActivityHistoryResponse,
  GetActivityQueryString, GetMediaHubItemsPayload,
  GetUGCQueryString,
  MediaHubGameClipResponseNode, MediaHubResponse,
  MediaHubScreenshotResponseNode, PlayerGameClipsFromActivityHistoryResponse, PlayerGameClipsResponse,
  PlayerScreenshotsFromActivityHistoryResponse,
  PlayerScreenshotsResponse,
  ProfileResponse,
  XBLAuthorization
} from '../../../interfaces/xbox.interfaces';
import {join} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable()
export class XboxService {
  public api: {};
  uris: {
    screenshots: 'https://screenshotsmetadata.xboxlive.com',
    gameclips: 'https://gameclipsmetadata.xboxlive.com',
    profile: 'https://profile.xboxlive.com',
    avty: 'https://avty.xboxlive.com',
    mediahub: 'https://mediahub.xboxlive.com'
  };
  request: {
    baseHeaders: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip',
      'Accept-Language': 'en-US',
      // 'User-Agent': USER_AGENT
    }
  };
  // USER_AGENT = [
  //   'Mozilla/5.0 (XboxReplay; XboxLiveAPI/3.0)',
  //   'AppleWebKit/537.36 (KHTML, like Gecko)',
  //   'Chrome/71.0.3578.98 Safari/537.36'
  // ].join(' ');
  constructor(private http: HttpClient) {
  }

  // ---- CHECKS ---- //
  isXUID = (entry: string | number) => /^([0-9]+)$/g.test(entry.toString());

  is2XX = (statusCode: number) => {
    const s = String(statusCode);
    // It ain't stupid if it works
    return s.length === 3 && s[0] === '2';
  }

  // ---- CALLS ---- //
  getPlayerGameClips = (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: GetUGCQueryString = {}
  ): Promise<PlayerGameClipsResponse> =>
    this.getPlayerUGC<PlayerGameClipsResponse>(
      gamertagOrXUID,
      authorization,
      qs,
      'gameclips'
    );

  getPlayerGameClipsFromMediaHub = (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    payload: GetMediaHubItemsPayload = {}
  ) =>
    this.getFromMediaHub<MediaHubGameClipResponseNode>(
      gamertagOrXUID,
      authorization,
      payload,
      'gameclips'
    );

  getPlayerGameClipsFromActivityHistory = async (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: Omit<
      GetActivityQueryString,
      'contentTypes' | 'activityTypes' | 'excludeTypes' | 'includeSelf'
      > = {}
  ): Promise<PlayerGameClipsFromActivityHistoryResponse> =>
    this.getPlayerActivityHistory(gamertagOrXUID, authorization, {
      ...qs,
      contentTypes: 'Game',
      activityTypes: 'GameDVR',
      excludeTypes: 'Screenshot'
    })

  getPlayerScreenshots = async (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: GetUGCQueryString = {}
  ): Promise<PlayerScreenshotsResponse> =>
    this.getPlayerUGC<PlayerScreenshotsResponse>(
      gamertagOrXUID,
      authorization,
      qs,
      'screenshots'
    )

  getPlayerScreenshotsFromMediaHub = (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    payload: GetMediaHubItemsPayload = {}
  ) =>
    this.getFromMediaHub<MediaHubScreenshotResponseNode>(
      gamertagOrXUID,
      authorization,
      payload,
      'screenshots'
    )

  getPlayerScreenshotsFromActivityHistory = async (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: Omit<
      GetActivityQueryString,
      'contentTypes' | 'activityTypes' | 'excludeTypes' | 'includeSelf'
      > = {}
  ): Promise<PlayerScreenshotsFromActivityHistoryResponse> =>
    this.getPlayerActivityHistory(gamertagOrXUID, authorization, {
      ...qs,
      contentTypes: 'Game',
      activityTypes: 'Screenshot',
      excludeTypes: 'GameDVR'
    })

  // ---- HTTP REQUEST METHODS ---- //

  getPlayerXUID = async (
    gamertag: string,
    authorization: XBLAuthorization
  ): Promise<string> => {
    if (this.isXUID(gamertag)) {
      return String(gamertag);
    }

    const response = await this.call<ProfileResponse>(
      {
        url: `${this.uris.profile}/${join(
          'users',
          `gt(${encodeURIComponent(gamertag)})`,
          'settings'
        )}`
      },
      authorization
    );

    if (response?.profileUsers?.[0]?.id === void 0) {
      throw new Error('Could not resolve player\'s XUID.');
    } else {
      return response.profileUsers[0].id.toString();
    }
  }

  getPlayerUGC = async <T> (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: GetUGCQueryString = {},
    type: 'screenshots' | 'gameclips'
  ) => {
    const target =
      this.isXUID(gamertagOrXUID) === true
        ? `xuid(${gamertagOrXUID})`
        : `xuid(${await this.getPlayerXUID(
        gamertagOrXUID as string,
        authorization
        )})`;

    return this.call<T>(
      {
        url: `${this.uris[type]}/${join(
          'users',
          target,
          type === 'screenshots' ? 'screenshots' : 'clips'
        )}`,
        params: {
          maxItems: qs.maxItems || 25,
          continuationToken: qs.continuationToken
        }
      },
      authorization
    );
  }

  getFromMediaHub = async <T = MediaHubScreenshotResponseNode | MediaHubGameClipResponseNode> (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    payload: GetMediaHubItemsPayload = {},
    target: 'screenshots' | 'gameclips'
  ): Promise<MediaHubResponse<T>> => {
    const xuid =
      this.isXUID(gamertagOrXUID) === true
        ? gamertagOrXUID
        : await this.getPlayerXUID(gamertagOrXUID as string, authorization);

    return this.call<MediaHubResponse<T>>(
      {
        url: `${this.uris.mediahub}/${target}/search`,
        method: 'POST',
        data: {
          query: [`OwnerXuid eq ${xuid.toString()}`, payload.query]
            .filter(q => !!q)
            .join(' and '),
          max: Math.min(payload.max || 100, 100),
          skip: Math.max(payload.skip || 0, 0),
          continuationToken: payload?.continuationToken
        }
      },
      authorization
    );
  }

  getPlayerActivityHistory = async (
    gamertagOrXUID: string | number,
    authorization: XBLAuthorization,
    qs: GetActivityQueryString = {}
  ): Promise<ActivityHistoryResponse> => {
    const target =
      this.isXUID(gamertagOrXUID) === true
        ? `xuid(${gamertagOrXUID})`
        : `xuid(${await this.getPlayerXUID(
        gamertagOrXUID as string,
        authorization
        )})`;

    return this.call<ActivityHistoryResponse>(
      {
        url: `${this.uris.avty}/${join(
          'users',
          target,
          'activity/History'
        )}`,
        params: qs
      },
      authorization
    );
  }

  call = <T = any>(
    config: AxiosRequestConfig = {},
    { userHash, XSTSToken }: XBLAuthorization,
    XBLContractVersion = 2
  ): Promise<T> => {
    const XBLContractVersionHeader = {
      'x-xbl-contract-version': XBLContractVersion
    };

    config.responseType = config.responseType || 'json';

    config.headers = {
      ...XBLContractVersionHeader,
      ...this.request.baseHeaders,
      Authorization: `XBL3.0 x=${userHash};${XSTSToken}`,
      ...(config.headers || {})
    };

    return axios(config)
      .then(response => {
        if (this.is2XX(response.status) === false) {
          throw new Error(`Invalid response status code for "${config.url}", got "${response.status}".`);
        } else {
          return response.data as T;
        }
      })
      .catch(err => {
        console.log('Err: ', err);
        throw new Error('');
      });
  }
}
