import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StatisticsService} from '../../../core/services/statistics/statistics-service.service';
import {isNewChange} from '../../utils/data.utils';

@Component({
  selector: 'likes',
  styleUrls: ['./likes.component.scss'],
  template: `
    <button
      [disabled]="!allowLikeAction"
      [style]="!allowLikeAction ? { opacity: 1, cursor: 'default' } : null"
      (click)="toggleLike()"
      class="btn btn-transparent item-likes text-info first-action mr-3"
      rel="tooltip"
      title="Likes">
      <span class="item-likes item-action">
        <icon name="thumbs-up" [style]="allowLikeAction ? liked ? {color: 'lightgreen'} : {color: 'red'} : null"></icon>
        {{ likeCount | number:'2.0'}}
      </span>
    </button>
  `
})
export class LikesComponent implements OnInit, OnChanges {
  @Input() clipId: any;
  @Input() authId: any;
  @Input() likeCount: any;
  @Input() allowLikeAction: any;
  liked: boolean;
  constructor(
    private statService: StatisticsService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges({clipId}: SimpleChanges): void {
    if (clipId && isNewChange(clipId) && this.allowLikeAction) {
      this.statService.isClipLiked(this.clipId, this.authId).then(check => {
        this.liked = check;
      });
    }
  }

  async toggleLike() {
    if (this.liked) {
      await this.statService.decrementLikes(this.clipId, this.authId).then(() => {
        this.liked = false;
        this.likeCount = this.likeCount - 1;
      });
    } else {
      await this.statService.incrementLikes(this.clipId, this.authId).then(() => {
        this.liked = true;
        this.likeCount = this.likeCount + 1;
      });
    }
  }


}
