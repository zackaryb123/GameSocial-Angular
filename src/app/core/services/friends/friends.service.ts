import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as friendsStore from '../../store/friends';
import {GameSocialState} from '../../store/reducers';
import {getFriends, getSelectedFriend, getSelectedFriendsId} from '../../store/friends';
import {take} from 'rxjs/operators';

@Injectable()
export class FriendsService {
  friends$ = this.store.select(getFriends);
  selectedFriendId$ = this.store.select(getSelectedFriendsId);
  selectedFriend = this.store.select(getSelectedFriend);

  constructor(
    private store: Store<GameSocialState>,
  ) {}

  removeVideo(video: any, friend: any) {
    this.store.dispatch(new friendsStore.RemoveFriend(friend));
  }

  selectVideo(friend) {
    this.store.dispatch(new friendsStore.SelectFriend(friend));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new friendsStore.FilterChange(filter));
  }

  getCurrent() {
    return this.selectedFriend.pipe(take(1)).subscribe(data => {
      return data;
    });
  }
}
