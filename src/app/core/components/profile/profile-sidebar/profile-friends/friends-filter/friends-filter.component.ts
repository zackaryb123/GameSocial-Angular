import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AppService} from '../../../../../services/app/app.service';
// import * as NowPlaylist from '@store/playlist';

@Component({
  selector: 'friends-filter',
  styleUrls: ['./friends-filter.scss'],
  template: `
  <section [class.center]="sidebarToggle$ | async" class="nav-header user-playlists-filter">
  <span class="playlist-header" (click)="onNowPlayingClick()">
      <icon name="play-circle-o"></icon>
<!--      <span class="text btn-transparent playlist-count"-->
<!--        title="Reveal now playing track">-->
<!--        Now Playing <span *ngIf="!isPlaylistEmpty()">({{ playlistLength }})</span>-->
<!--      </span>-->
    </span>
<!--    <button class="btn btn-link btn-xs btn-clear"-->
<!--      title="Clear All Tracks In Now Playlist"-->
<!--      [disabled]="isPlaylistEmpty()"-->
<!--      (click)="clearPlaylist()">-->
<!--      <icon name="trash"></icon>-->
<!--    </button>-->
<!--    <button class="btn btn-link btn-xs btn-save" title="Save All These Tracks To A New Playlist"-->
<!--      disabled-->
<!--      ng-disabled="!nowPlaylistFilter.playlist.length"-->
<!--      ng-click="nowPlaylistFilter.togglePlaylistSaver()">-->
<!--      <icon name="cloud-upload-alt"></icon>-->
<!--    </button>-->
    <div class="playlist-filter">
      <icon name="search" *ngIf="isFilterEmpty()"></icon>
<!--      <icon name="times" class="text-danger"-->
<!--        *ngIf="!isFilterEmpty()"-->
<!--        (click)="resetSearchFilter()"></icon>-->
      <input type="search" name="playlist-search"
        [value]="friends.filter"
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsFilterComponent implements OnInit {
  @Input() friends: any;

  sidebarToggle$ = this.appService.sidebarToggle$;
  // @Output() save = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  constructor(
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    console.log(this.friends);
    this.sidebarToggle$.subscribe(data => {
      console.log(data);
    });
  }

  handleFilterChange(searchFilter: string) {
    this.filter.next(searchFilter);
  }

  resetSearchFilter() {
    this.reset.next('');
  }

  isFilterEmpty() {
    if (this.friends) {
      return this.friends.filter === '';
    }
  }

  clearPlaylist() {
    this.clear.next('');
  }

  isPlaylistEmpty() {
    return this.friendsLength === 0;
  }

  onNowPlayingClick() {
    this.headerClick.next();
  }

  get friendsLength() {
    if (this.friends) {
      return this.friends.friends[this.friends.selectedFriendsId].length;
    }
  }
}
