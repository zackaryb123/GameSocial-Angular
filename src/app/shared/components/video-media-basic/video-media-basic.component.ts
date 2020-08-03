import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ICON_PREFIX_BRAND} from '../../directives/icon';
import {getSelectedPlaylistId} from '../../../core/store/playlist';
import {isNewChange} from '../../utils/data.utils';
import {PlaylistService} from '../../../core/services/playlist/playlist.service';
import {AuthService} from '../../../core/services/auth';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../core/store/reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'video-media-basic',
  templateUrl: './video-media-basic.component.html',
  styleUrls: ['./video-media-basic.component.scss']
})

export class VideoMediaBasicComponent implements OnInit {
  @Input() enableDetails: boolean;
  @Input() enableOptions: boolean;
  @Input() enableStatistics: boolean;
  @Input() type: any;
  @Input() media: any;
  @Input() queued = false;
  @Output() play = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() unqueue = new EventEmitter<any>();

  selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  ngOnInit(): void {
    console.log('this.media: ', this.media);
  }

  ngOnChanges({media}: SimpleChanges): void {
    if (media && isNewChange(media)) {
      this.media = media.currentValue;
      console.log('New Media', media);
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

  playVideo(media: any) {
    // this.play.emit(media);
  }

  queueVideo(media: any) {
    // this.queue.emit(media);
  }

  addVideoToPlaylist(playlistId, mediaId) {
    // return this.playlistService.addToPlaylist(this.authId, mediaId, playlistId);
  }

  toggle(showDesc: boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: any) {
    // this.unqueue.emit(media);
  }
}
