import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {FriendsComponent} from './friends/friends.component';
import {AppService} from '../../../../services/app/app.service';
import {FriendsService} from '../../../../services/friends/friends.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";

@Component({
  selector: 'profile-friends-list',
  styleUrls: ['./profile-friends.scss'],
  template: `
  <div class="sidebar-pane">
    <friends-filter
      [friends]="friends$ | async"
      [filter]="filter$ | async"
      (clear)="clearPlaylist()"
      (updateFilter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></friends-filter>
    <friends
      *ngIf="friends$ | async"
      [friends]="friends$ | async"
      [filter]="filter$ | async"
      (select)="selectVideo($event)"
      (selectTrack)="selectTrackInVideo($event)"
      (remove)="removeVideo($event)"
      (sort)="sortPlaylist($event)"
    ></friends>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFriendsList implements OnInit {
  friends$: Observable<any>; // Observable<any>;
  filter$ = this.appService.filter$;
  @ViewChild(FriendsComponent, { static: true }) playlistComponent: FriendsComponent;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private appService: AppService,
    private friendsService: FriendsService,
  ) {
    this.friends$ = this.friendsService.friends$;
  }

  ngOnInit() {
    // this.friends$ = this.friendsService.friends$;
  }

  selectVideo(media: any) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    // this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortPlaylist(playlist) {
    // this.nowPlaylistService.sortPlaylist(playlist);
  }

  updateFilter(searchFilter: string) {
    // this.friendsService.updateFriendFilter(searchFilter);
  }

  resetFilter() {
    // this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist() {
    // this.nowPlaylistService.clearPlaylist();
  }

  removeVideo(media) {
    // this.nowPlaylistService.removeVideo(media);
  }

  onHeaderClick() {
    this.playlistComponent.scrollToActiveFriend();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: any;
  }) {
    // this.store.dispatch(new AppPlayer.PlayVideo(trackEvent.media));
    // this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
