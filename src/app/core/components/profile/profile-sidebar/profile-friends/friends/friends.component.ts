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
    <div *ngIf="isFriendsEmpty" [class.empty-list-closed]="sidebarToggle$ | async" class="empty-list text-center" [@flyOut]>
      <icon name="play-circle-o" class="c-cfb ux-maker"></icon>
      <article>
        <h3 class="c-cfb">Friends are Empty</h3>
        <p class="c-cfb">Queue Media From Results</p>
      </article>
    </div>
    <ul class="nav nav-list ux-maker nicer-ux" cdkDropList
      (cdkDropListDropped)="onFriendDrop($event)"
      [cdkDropListLockAxis]="'y'">
      <li class="now-playlist-track" #friendsTrack cdkDrag
        *ngFor="let friend of friends; let index = index"
        [class.active]="isActiveFriend(friend.uid, friendsTrack)"
        [@flyOut]>
        <friends-track
          [friend]="friend"
          (remove)="removeVideo($event)"
          (select)="selectFriend(friends)"
          (selectTrack)="selectFriendInList($event)"
        ></friends-track>
      </li>
    </ul>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() friends: any;
  @Input() filter: any;

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
  }

  ngAfterViewChecked() {
    if (this.hasActiveChanged && this.activeTrackElement) {
      this.zone.runOutsideAngular(() => this.scrollToActiveFriend());
    }
  }

  ngOnChanges({ activeId }: SimpleChanges) {
    if (activeId) {
      this.hasActiveChanged = isNewChange(activeId);
    }
  }

  scrollToActiveFriend() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectFriend(friend: any) {
    this.select.emit(friend);
  }

  removeVideo(friend: any) {
    this.remove.emit(friend);
  }

  isActiveFriend(friendId: string, friendElement: HTMLUListElement) {
    const isActive = this.friends.selectedId === friendId;
    if (isActive) {
      this.activeTrackElement = friendElement;
    }
    return isActive;
  }

  selectFriendInList(friendEvent: { time; media }) {
    this.selectTrack.emit(friendEvent);
  }

  onFriendDrop({
    currentIndex,
    previousIndex
  }: CdkDragDrop<any>) {
    const videos = [...this.friends];
    moveItemInArray(videos, previousIndex, currentIndex);
    this.sort.emit(videos);
  }

  get isFriendsEmpty() {
    return this.friends === null || this.friends.length === 0;
  }
}
