import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AppService} from '../../../../../services/app/app.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'playlist-filter',
  styleUrls: ['./playlist-filter.scss'],
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
      <icon name="search"></icon>
<!--      <icon name="times" class="text-danger"-->
<!--        *ngIf="!isFilterEmpty()"-->
<!--        (click)="resetSearchFilter()"></icon>-->
      <input type="search" name="playlist-search"
        [value]=""
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistFilterComponent implements OnInit {
  @Input() playlist: any;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  sidebarToggle$ = this.appService.sidebarToggle$
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

    // this.sidebarToggle$
    //   .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
    //   .subscribe(data => {
    //   console.log(data);
    // });
  }

  handleFilterChange(searchFilter: string) {
    this.filter.next(searchFilter);
  }

  resetSearchFilter() {
    this.reset.next('');
  }

  isFilterEmpty() {
    // if (this.playlist) {
    //   return this.playlist.filter === '';
    // }
  }

  clearPlaylist() {
    this.clear.next('');
  }

  isPlaylistEmpty() {
    return this.playlistLength === 0;
  }

  onNowPlayingClick() {
    this.headerClick.next();
  }

  get playlistLength() {
    if (this.playlist) {
      return this.playlist.length;
    }
  }
}
