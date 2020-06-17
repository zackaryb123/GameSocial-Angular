import {createSelector} from '@ngrx/store';
import {GameSocialState} from '../reducers';
import {IUserStore} from './user-reducer';

export const getUserStore = (state: GameSocialState) => state.userStore;

export const getUserData = createSelector(
  getUserStore,
  (userStore: IUserStore) => userStore.info
);

export const getUserFriends = createSelector(
  getUserStore,
  (userStore: IUserStore) => userStore.friends
)

