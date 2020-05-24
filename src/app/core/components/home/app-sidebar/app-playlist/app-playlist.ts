import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistService} from '../../../../services/playlist/playlist.service';
import {AppService} from "../../../../services/app/app.service";

@Component({
  selector: 'app-playlist',
  styleUrls: ['./app-playlist.scss'],
  template: `
  <div class="sidebar-pane">
    <playlist-filter
      *ngIf="playlist$ | async"
      [playlist]="playlist$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></playlist-filter>
    <playlist
      *ngIf="playlist$ | async"
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
export class AppPlaylist implements OnInit {
  playlist$ = this.playlistService.slectedPlayist$;
  @ViewChild(PlaylistComponent, { static: true }) nowPlaylistComponent: PlaylistComponent;

  constructor(
    private playlistService: PlaylistService,
    private appService: AppService
    // public nowPlaylistService: NowPlaylistService
  ) {}

  ngOnInit() {
    this.playlistService.selectedPlaylistId$.subscribe(data => {
      console.log(data);
    });
    this.appService.sidebarToggle$.subscribe(data => {
      console.log(data);
    });
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
