import {
  ChangeDetectionStrategy,
  Component, Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistService} from '../../../../services/playlist/playlist.service';
import {GameClipsService} from '../../../../services/game-clips/game-clips.service';
import {isNewChange} from '../../../../../shared/utils/data.utils';

@Component({
  selector: 'app-playlist',
  styleUrls: ['./app-playlist.scss'],
  template: `
  <div class="sidebar-pane">
    <playlist-filter
      *ngIf="playlist"
      [playlist]="playlist"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></playlist-filter>
    <playlist
      *ngIf="playlist"
      [playlist]="playlist"
      (select)="selectVideo($event)"
      (selectTrack)="selectTrackInVideo($event)"
      (remove)="removeVideo($event)"
      (sort)="sortPlaylist($event)"
    ></playlist>
  </div>
  `,
})
export class AppPlaylist implements OnInit, OnChanges {
  @ViewChild(PlaylistComponent, { static: true }) playlistComponent: PlaylistComponent;
  @Input() selectedPlaylist: any;
  playlist: any = [];

  // selectedPlaylist$ = this.playlistService.selectedPlaylist$;

  constructor(
    private playlistService: PlaylistService,
    private gameClipsService: GameClipsService,
    // public nowPlaylistService: NowPlaylistService
  ) {
  }

  async ngOnInit() {
  }

  ngOnChanges({selectedPlaylist}: SimpleChanges): void {
    if (selectedPlaylist && isNewChange(selectedPlaylist)) {
      this.gameClipsService.getListClipsServer(selectedPlaylist.currentValue.clips).then(data => {
        console.log(data);
        this.playlist = data;
      });
    }
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
