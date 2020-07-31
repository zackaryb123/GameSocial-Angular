import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistService} from '../../../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  styleUrls: ['./app-playlist.scss'],
  template: `
  <div class="sidebar-pane">
    <playlist-filter
      [playlist]="selectedPlaylist$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></playlist-filter>
    <playlist
      *ngIf="selectedPlaylist$ | async"
      [playlist]="selectedPlaylist$ | async"
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
  @ViewChild(PlaylistComponent, { static: true }) playlistComponent: PlaylistComponent;
  @Input() playlist: any;
  selectedPlaylist$ = this.playlistService.selectedPlaylist$;

  constructor(
    private playlistService: PlaylistService,
    // public nowPlaylistService: NowPlaylistService
  ) {
  }

  ngOnInit() {
  }

  selectVideo(media: any) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    // this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortPlaylist(playlist) {
    // this.nowPlaylistService.sortPlaylist(playlist);
  }

  updateFilter(searchFilter: string) {
    this.playlistService.updateFilter(searchFilter);
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
    this.playlistComponent.scrollToActiveTrack();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: any;
  }) {
    // this.store.dispatch(new AppPlayer.PlayVideo(trackEvent.media));
    // this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
