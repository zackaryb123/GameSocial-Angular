import { ActionReducerMap } from '@ngrx/store';

// reducers
import {IAppStore, appStore, AppActionTypes} from './app';
import {IProfileStore, profileStore, ProfileActionTypes} from './search';

export interface GameSocialState {
  appStore: IAppStore;
  profileStore: IProfileStore;
}

export let GameSocialReducers: ActionReducerMap<GameSocialState> = {
  appStore,
  profileStore
};

export let GameSocialActions = [
  AppActionTypes,
  ProfileActionTypes
];
