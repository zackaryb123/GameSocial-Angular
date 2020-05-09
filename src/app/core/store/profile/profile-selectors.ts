import {createSelector} from '@ngrx/store';
import {GameSocialState} from '../reducers';
import {IProfileStore} from './profile-reducer';

export const getProfileStore = (state: GameSocialState) => state.profileStore;

export const getProfileData = createSelector(
  getProfileStore,
  (profileStore: IProfileStore) => profileStore.data
);
