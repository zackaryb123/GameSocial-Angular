import { ActionReducerMap } from '@ngrx/store';

// reducers
import {IAppStore, appStore, AppActionTypes} from './app';
import {IProfileStore, profileStore, ProfileActionTypes} from './profile';
import {IPlaylistStore, playlistStore, PlaylistActionTypes} from './playlist';
import {IPlayerStore, playerStore, PlayerActionTypes} from './player';

export interface GameSocialState {
  appStore: IAppStore;
  profileStore: IProfileStore;
  playlistStore: IPlaylistStore;
  playerStore: IPlayerStore;
}

export let GameSocialReducers: ActionReducerMap<GameSocialState> = {
  appStore,
  profileStore,
  playlistStore,
  playerStore
};

export let GameSocialActions = [
  AppActionTypes,
  ProfileActionTypes,
  PlaylistActionTypes,
  PlayerActionTypes
];
