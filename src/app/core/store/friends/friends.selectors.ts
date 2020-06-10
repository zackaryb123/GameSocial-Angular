import { createSelector } from '@ngrx/store';
import {GameSocialState} from '../reducers';
import {IFriendsStore} from './friends.reducer';

export const getFriendsStore = (state: GameSocialState) => state.friendsStore;

export const getFriends = createSelector(
  getFriendsStore,
  (fiendsStore: IFriendsStore) => fiendsStore
);

export const getSelectedFriendsId = createSelector(
  getFriendsStore,
  (fiendsStore: IFriendsStore) => fiendsStore.selectedFriendId
);

export const getSelectedFriend = createSelector(
  getFriendsStore,
  (fiendsStore: IFriendsStore) => {
    if (fiendsStore.friends) {
      return fiendsStore.friends.find(f => f.uid === fiendsStore.selectedFriendId);
    }
  }
);
