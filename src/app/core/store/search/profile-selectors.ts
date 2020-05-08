import {createSelector} from '@ngrx/store';
import {GameSocialState} from '../reducers';
import {IProfileStore} from './profile-reducer';

export const getProfileReducer = (state: GameSocialState) => state.profileStore;

export const getProfileData = createSelector(
  getProfileReducer,
  (profileStore: IProfileStore) => profileStore.data
);
