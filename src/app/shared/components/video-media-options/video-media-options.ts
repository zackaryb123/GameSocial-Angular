import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {ICON_PREFIX_BRAND} from '../../directives/icon';
import {AuthService} from '../../../core/services/auth';
import {AppService} from '../../../core/services/app/app.service';
import {getSelectedPlaylistId} from '../../../core/store/playlist';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../core/store/reducers';
import {PlaylistService} from '../../../core/services/playlist/playlist.service';
import {Router} from '@angular/router';
import {isNewChange} from '../../utils/data.utils';

@Component({
  selector: 'video-media-options',
  styleUrls: ['./video-media-options.scss'],
  templateUrl: './video-media-options.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoMediaOptionsComponent implements OnInit, OnChanges {
  @Input() authId: any;
  @Input() enableDetails: boolean;
  @Input() enableOptions: boolean;
  @Input() enableStatistics: boolean;
  @Input() allowViewCount: boolean;
  @Input() allowLikeAction: boolean;
  @Input() isAuthUser: boolean;
  @Input() adminActionEnabled: boolean;
  @Input() type: any;
  @Input() media: any;
  @Input() queued = false;
  @Output() play = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() unqueue = new EventEmitter<any>();

  playlists: any;
  selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  ngOnInit(): void {
  }

  ngOnChanges({media}: SimpleChanges): void {
    if (media && isNewChange(media)) {
      // this.media = media.currentValue;
    }
  }

  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private store: Store<GameSocialState>,
    private router: Router
  ) {
  }

  goClip(media) {
    if (this.type !== 'clip') {
      return this.router.navigateByUrl(`/home/(clip:${media.id})`);
    }
  }

  getPlaylist() {
    this.playlistService.getPlaylistPromise(this.authId).then(data => {
      console.log('playlists : ', data);
      this.playlists = data;
    });
  }

  addVideo(media: any) { }

  playVideo(media: any) {
    // this.play.emit(media);
  }

  queueVideo(media: any) {
    // this.queue.emit(media);
  }

  addVideoToPlaylist(playlistId, mediaId) {
    return this.playlistService.addToPlaylist(this.authId, mediaId, playlistId);
  }

  toggle(showDesc: boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: any) {
    // this.unqueue.emit(media);
  }
}
