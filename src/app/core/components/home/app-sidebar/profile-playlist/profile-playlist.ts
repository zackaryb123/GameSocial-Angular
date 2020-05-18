import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// import { NowPlaylistService } from '@core/services/playlist.service';
// import { INowPlaylist } from '@store/playlist';
// import * as AppPlayer from '@store/app-player/app-player.actions';
import {GameSocialState} from '../../../../store/reducers';
import {PlaylistComponent} from './playlist/playlist.component';

@Component({
  selector: 'profile-playlist',
  styleUrls: ['./profile-playlist.scss'],
  template: `
  <div class="sidebar-pane">
    <playlist-filter
      [playlist]="playlist$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></playlist-filter>
    <playlist
      [playlist]="playlist$ | async"
      (select)="selectVideo($event)"
      (selectTrack)="selectTrackInVideo($event)"
      (remove)="removeVideo($event)"
      (sort)="sortPlaylist($event)"
    ></playlist>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePlaylist implements OnInit {
  public playlist$: Observable<any>;
  @ViewChild(PlaylistComponent, { static: true }) nowPlaylistComponent: PlaylistComponent;

  constructor(
    public store: Store<GameSocialState>,
    // public nowPlaylistService: NowPlaylistService
  ) {}

  ngOnInit() {
    // this.playlist$ = this.nowPlaylistService.playlist$;
  }

  selectVideo(media: any) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    // this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortPlaylist(playlist) {
    // this.nowPlaylistService.sortPlaylist(playlist);
  }

  updateFilter(searchFilter: string) {
    // this.nowPlaylistService.updateFilter(searchFilter);
  }

  resetFilter() {
    // this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist() {
    // this.nowPlaylistService.clearPlaylist();
  }

  removeVideo(media) {
    // this.nowPlaylistService.removeVideo(media);
  }

  onHeaderClick() {
    this.nowPlaylistComponent.scrollToActiveTrack();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: any;
  }) {
    // this.store.dispatch(new AppPlayer.PlayVideo(trackEvent.media));
    // this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
