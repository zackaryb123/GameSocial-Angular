import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
  AfterViewChecked,
  NgZone,
  SimpleChanges, OnInit
} from '@angular/core';
// import * as NowPlaylist from '@store/playlist';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {flyOut} from '../../../../../../shared/animations/fade-in.animation';
import {isNewChange} from '../../../../../../shared/utils/data.utils';
import {AppService} from '../../../../../services/app/app.service';

@Component({
  selector: 'friends',
  animations: [flyOut],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./friends.scss'],
  template: `
  <section class="now-playlist ux-maker">
    <div *ngIf="isPlaylistEmpty" [class.empty-list-closed]="sidebarToggle$ | async" class="empty-list text-center" [@flyOut]>
      <icon name="play-circle-o" class="c-cfb ux-maker"></icon>
      <article>
        <h3 class="c-cfb">Playlist Is Empty</h3>
        <p class="c-cfb">Queue Media From Results</p>
      </article>
    </div>
    <ul class="nav nav-list ux-maker nicer-ux" cdkDropList
      (cdkDropListDropped)="onTrackDrop($event)"
      [cdkDropListLockAxis]="'y'">
      <li class="now-playlist-track" #playlistTrack cdkDrag
        *ngFor="let video of playlist.videos | search:playlist.filter; let index = index"
        [class.active]="isActiveMedia(video.id, playlistTrack)"
        [@flyOut]>
        <friends-track
          [video]="video" [index]="index"
          (remove)="removeVideo($event)"
          (select)="selectVideo(video)"
          (selectTrack)="selectTrackInVideo($event)"
        ></friends-track>
      </li>
    </ul>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() playlist: any;

  @Output() select = new EventEmitter<any>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: any;
  }>();
  @Output() remove = new EventEmitter<any>();
  @Output() sort = new EventEmitter<any[]>();

  sidebarToggle$ = this.appService.sidebarToggle$;

  public activeTrackElement: HTMLUListElement;
  public hasActiveChanged = false;

  constructor(
    public zone: NgZone,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    console.log('this.playlist: ', this.playlist);
  }

  ngAfterViewChecked() {
    if (this.hasActiveChanged && this.activeTrackElement) {
      this.zone.runOutsideAngular(() => this.scrollToActiveTrack());
    }
  }

  ngOnChanges({ activeId }: SimpleChanges) {
    if (activeId) {
      this.hasActiveChanged = isNewChange(activeId);
    }
  }

  scrollToActiveTrack() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectVideo(media: any) {
    this.select.emit(media);
  }

  removeVideo(media: any) {
    this.remove.emit(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.selectedId === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }

  selectTrackInVideo(trackEvent: { time; media }) {
    this.selectTrack.emit(trackEvent);
  }

  onTrackDrop({
    currentIndex,
    previousIndex
  }: CdkDragDrop<any>) {
    const videos = [...this.playlist.videos];
    moveItemInArray(videos, previousIndex, currentIndex);
    this.sort.emit(videos);
  }

  get isPlaylistEmpty() {
    return this.playlist.videos.length === 0;
  }
}