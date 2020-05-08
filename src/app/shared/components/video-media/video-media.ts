import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {ICON_PREFIX_BRAND} from '../../directives/icon';

@Component({
  selector: 'video-media',
  styleUrls: ['./video-media.scss'],
  templateUrl: './video-media.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoeMediaComponent {
  @Input() media: any;
  @Input() queued = false;
  @Output() play = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() unqueue = new EventEmitter<any>();

  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  constructor() { }

  playVideo(media: any) {
    this.play.emit(media);
  }

  queueVideo(media: any) {
    this.queue.emit(media);
  }

  addVideoToPlaylist(media: any) {
    this.add.emit(media);
  }

  toggle(showDesc: boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: any) {
    this.unqueue.emit(media);
  }
}
