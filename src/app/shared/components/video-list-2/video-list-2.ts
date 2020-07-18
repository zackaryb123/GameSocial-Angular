import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
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
  selector: 'video-list2',
  styleUrls: ['./video-list-2.scss'],
  animations: [fadeInAnimation],
  template: `
<!--    class="video-list-container list-unstyled clearfix"-->
  <div fxLayout="row wrap" fxLayoutGap="grid">
<!--    class="video-list-item"-->
    <div fxFlex="25%" fxFlex.xs="100%" fxFlex.sm="50%" fxFlex.md="33%" fxFlex.lg="25%" [@fadeIn] *ngFor="let media of list">
      <video-media
        [type]="'thumbnail'"
        [media]="media"
        [queued]="false">
      </video-media>
<!--      [queued]="media | isInQueue:queued"-->
<!--      (play)="playSelectedVideo(media)"-->
<!--      (queue)="queueSelectedVideo(media)"-->
<!--      (unqueue)="unqueueSelectedVideo(media)"-->
<!--      (add)="addVideo(media)"-->
    </div>
  </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoList2Component implements OnChanges, OnInit {
  @Input() list: any[];
  @Input() queued: string[] = [];
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() unqueue = new EventEmitter();

  queuedMediaIdMap = {};

  constructor() {
  }

  ngOnInit(): void {
    console.log('this.list: ', this.list);
  }

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
