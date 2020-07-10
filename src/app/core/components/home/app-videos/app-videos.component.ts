import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';
import {AppService} from '../../../services/app/app.service';
import {GameClipNode} from '../../../interfaces/xbox.interfaces';
import {XboxService} from '../../../services/3rd-party/microsoft/xbox.service';
import {TEST_VIDEOS} from "../../../constants/test-data";

// actions
// import * as fromPlayerSearch from '@core/store/player-profile';
// import { AppPlayerApi } from '@core/api/app-player.api';
// selectors
// import * as NowPlaylist from '@core/store/playlist';
// import { AppApi } from '../../../core/api/app.api';

@Component({
  selector: 'app-videos',
  styleUrls: ['./app-videos.scss'],
  template: `
<!--    <loader [message]="'Loading Awesome Media Results'" [loading]="loading$"></loader>-->
    <separator
    [title]="'Xbox'">
    </separator>
    <video-list2
      [list]="videos$"
      [queued]="playlistIds$"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
      (add)="addMediaToPlaylist($event)"
    ></video-list2>
  `
})
export class AppVideosComponent implements OnInit {
  // videos$: any;
  videos$: GameClipNode[];
  // this.store.select(fromPlayerSearch.getPlayerSearchResults);
  playlistIds$ = ''; // this.store.select(NowPlaylist.getPlaylistMediaIds);
  loading$ = false; // this.store.select(fromPlayerSearch.getIsSearching);

  constructor(
    private appService: AppService,
    private xboxService: XboxService
  ) { }

  async ngOnInit() {
    // this.videos$ = TEST_VIDEOS;
    this.videos$ = await this.xboxService.getGameClips('pr0Xt0Xtype18');
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
    this.appService.toggleModal(true, media);
  }

}
