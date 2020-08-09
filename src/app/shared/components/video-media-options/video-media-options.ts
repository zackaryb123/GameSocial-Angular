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
import {GameClipsService} from '../../../core/services/game-clips/game-clips.service';
import {UserService} from '../../../core/services/user';

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
  @Input() allowUserInfo: boolean;
  @Input() isAuthUser: boolean;
  @Input() adminActionEnabled: boolean;
  @Input() type: any;
  @Input() media: any;
  @Input() queued = false;
  @Output() play = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() unqueue = new EventEmitter<any>();
  @Output() removed = new EventEmitter<any>();

  user: any;
  playlists: any;
  selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  constructor(
    private playlistService: PlaylistService,
    private clipService: GameClipsService,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<GameSocialState>,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges({media}: SimpleChanges): void {
    if (media && isNewChange(media)) {
      if (this.allowUserInfo) {
        this.userService.getUser(this.media.uid).then(data => {
          this.user = data;
        });
      }
    }
  }

  goClip(media) {
    if (this.type !== 'clip') {
      return this.router.navigateByUrl(`/home/(clip:${media.id})`);
    }
  }

  goUser(userId) {
    return this.router.navigateByUrl(`/profile/(user:${userId})`);
  }

  getPlaylist() {
    this.playlistService.getPlaylistPromise(this.authId).then(data => {
      console.log('playlists : ', data);
      this.playlists = data;
    });
  }

  removeVideo(authId: any, clipId: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.clipService.removeGameClip(authId, clipId);
      this.removed.emit(true);
    }
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
}
