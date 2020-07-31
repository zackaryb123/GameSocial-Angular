import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {fadeInAnimation} from '../../animations';

function createIdMap(list: any[]) {
  return list.reduce((acc, cur) => {
    acc[cur.id] = true;
    return acc;
  }, {});
}

@Component({
  selector: 'video-list',
  styleUrls: ['./video-list.scss'],
  animations: [fadeInAnimation],
  template: `
  <ul class="video-list-container list-unstyled clearfix">
    <li class="video-list-item" [@fadeIn] *ngFor="let media of list">
      <video-media-options
        enableDetails="true"
        enableStatistics="true"
        enableOptions="true"
        [type]="'thumbnail'"
        [media]="media"
        [queued]="media | isInQueue:queued"
        (play)="playSelectedVideo(media)"
        (queue)="queueSelectedVideo(media)"
        (unqueue)="unqueueSelectedVideo(media)"
        (add)="addVideo(media)">
      </video-media-options>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnChanges {
  @Input() list: any[] = [];
  @Input() queued: string[] = [];
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() unqueue = new EventEmitter();

  queuedMediaIdMap = {};

  constructor() {}

  ngOnChanges({ queued }: SimpleChanges) {
    // if (queued && queued.currentValue) {
    //   console.log('YoutubeListComponent.createIdMap()');
    //   this.queuedMediaIdMap = createIdMap(queued.currentValue);
    // }
  }

  playSelectedVideo(media) {
    this.play.emit(media);
  }

  queueSelectedVideo(media) {
    this.queue.emit(media);
  }

  addVideo(media) {
    this.add.emit(media);
  }

  unqueueSelectedVideo(media) {
    this.unqueue.emit(media);
  }

  getMediaStatus(media: any) {
    return {
      queued: this.queuedMediaIdMap[media.id]
    };
  }
}
