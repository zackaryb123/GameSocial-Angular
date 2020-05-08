import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';

// actions
// import * as fromPlayerSearch from '@core/store/player-search';
// import { AppPlayerApi } from '@core/api/app-player.api';
// selectors
// import * as NowPlaylist from '@core/store/now-playlist';
// import { AppApi } from '../../../core/api/app.api';

@Component({
  selector: 'app-videos',
  styleUrls: ['./app-videos.scss'],
  template: `
<!--    <loader [message]="'Loading Awesome Media Results'" [loading]="loading$"></loader>-->
    <video-list
      [list]="videos$"
      [queued]="playlistIds$"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
      (add)="addMediaToPlaylist($event)"
    ></video-list>
  `
})
export class AppVideosComponent implements OnInit {
  videos$ = []; // this.store.select(fromPlayerSearch.getPlayerSearchResults);
  playlistIds$ = ''; // this.store.select(NowPlaylist.getPlaylistMediaIds);
  loading$ = false; // this.store.select(fromPlayerSearch.getIsSearching);

  constructor(
    // private store: Store<GameSocialState>,
    // private appPlayerApi: AppPlayerApi,
    // private appApi: AppApi
  ) { }

  ngOnInit() {
    // this.store.dispatch(
      // new fromPlayerSearch.UpdateSearchType(fromPlayerSearch.CSearchTypes.VIDEO)
    // );
    // this.store.dispatch(new fromPlayerSearch.SearchCurrentQuery());
  }

  playSelectedVideo(media: any) {
    // this.appPlayerApi.playVideo(media);
  }

  queueSelectedVideo(media: any) {
    // this.appPlayerApi.queueVideo(media);
  }

  removeVideoFromPlaylist(media: any) {
    // this.appPlayerApi.removeVideoFromPlaylist(media);
  }

  addMediaToPlaylist(media: any) {
    // this.appApi.toggleModal(true, media);
  }

}
