import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {FriendsComponent} from './friends/friends.component';
import {FriendsService} from '../../../../services/friends/friends.service';

@Component({
  selector: 'profile-friends-list',
  styleUrls: ['./profile-friends.scss'],
  template: `
  <div class="sidebar-pane">
    <friends-filter
      [friends]="friends$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></friends-filter>
    <friends
      *ngIf="friends$ | async"
      [friends]="friends$ | async"
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
  friends$ = this.friendsService.friends$;
  @ViewChild(FriendsComponent, { static: true }) playlistComponent: FriendsComponent;

  constructor(
    private friendsService: FriendsService
  ) {
  }

  ngOnInit() {
    // this.playlist$ = this.nowPlaylistService.playlist$;
  }

  selectVideo(media: any) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    // this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortPlaylist(playlist) {
    // this.nowPlaylistService.sortPlaylist(playlist);
  }

  updateFilter(searchFilter: string) {
    this.friendsService.updateFilter(searchFilter);
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
