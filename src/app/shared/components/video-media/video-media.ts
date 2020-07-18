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
  selector: 'video-media',
  styleUrls: ['./video-media.scss'],
  templateUrl: './video-media.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoeMediaComponent implements OnInit, OnChanges {
  @Input() type: any;
  @Input() media: any;
  @Input() queued = false;
  @Output() play = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() unqueue = new EventEmitter<any>();

  auth: any;
  selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  ngOnInit(): void {
    console.log('this.media: ', this.media);
  }

  ngOnChanges({media}: SimpleChanges): void {
    if (media && isNewChange(media)) {
      console.log('New Media', media);
    }
  }

  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private store: Store<GameSocialState>,
    private router: Router
  ) {
    this.auth = this.authService.getAuth();
  }

  goClip(media) {
    if (this.type !== 'clip') {
      return this.router.navigateByUrl(`/home/(clip:${media.id})`);
    }
  }

  playVideo(media: any) {
    // this.play.emit(media);
  }

  queueVideo(media: any) {
    // this.queue.emit(media);
  }

  addVideoToPlaylist(media: any) {

    // this.add.emit(media);
  }

  toggle(showDesc: boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: any) {
    // this.unqueue.emit(media);
  }
}
