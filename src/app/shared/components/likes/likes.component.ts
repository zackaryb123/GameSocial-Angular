import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StatisticsService} from '../../../core/services/statistics/statistics-service.service';
import {isNewChange} from '../../utils/data.utils';

@Component({
  selector: 'likes',
  styleUrls: ['./likes.component.scss'],
  template: `
    <button
      *ngIf="!likeLoading"
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
    <div *ngIf="likeLoading" class="spinner-grow" role="status" style="color: cornflowerblue">
      <span class="sr-only">Loading...</span>
    </div>
  `
})
export class LikesComponent implements OnInit, OnChanges {
  @Input() clipId: any;
  @Input() authId: any;
  @Input() likeCount: any;
  @Input() allowLikeAction: any;
  likeLoading: boolean;
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
    this.likeLoading = true;
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
    this.likeLoading = false;
  }


}
