import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {AppService} from '../../../../services/app/app.service';
import {FriendsService} from '../../../../services/friends/friends.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ProfileSidebarFriendsListComponent} from './profile-sidebar-friends-list/profile-sidebar-friends-list.component';

@Component({
  selector: 'profile-sidebar-friends',
  styleUrls: ['./profile-sidebar-friends.scss'],
  template: `
  <div class="sidebar-pane">
    <profile-sidebar-friends-filter
      [friends]="friends$ | async"
      [filter]="filter$ | async"
      (clear)="clearPlaylist()"
      (updateFilter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></profile-sidebar-friends-filter>
    <profile-sidebar-friends-list
      *ngIf="friends$ | async"
      [friends]="friends$ | async"
      [filter]="filter$ | async"
      (select)="selectVideo($event)"
      (selectTrack)="selectTrackInVideo($event)"
      (remove)="removeVideo($event)"
      (sort)="sortPlaylist($event)"
    ></profile-sidebar-friends-list>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSidebarFriends implements OnInit {
  friends$: Observable<any>;
  filter$ = this.appService.filter$;
  @ViewChild(ProfileSidebarFriendsListComponent, { static: true }) playlistComponent: ProfileSidebarFriendsListComponent;

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
