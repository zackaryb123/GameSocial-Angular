import { ActionReducerMap } from '@ngrx/store';

// reducers
import {IAppStore, appStore, AppActionTypes} from './app';
import {IPlaylistStore, playlistStore, PlaylistActionTypes} from './playlist';
import {IPlayerStore, playerStore, PlayerActionTypes} from './player';
import {IFriendsStore, friendsStore, FriendsActionTypes} from './friends';
import {IUserStore, userStore, UserActionTypes} from './user';

export interface GameSocialState {
  appStore: IAppStore;
  userStore: IUserStore;
  playlistStore: IPlaylistStore;
  friendsStore: IFriendsStore;
  playerStore: IPlayerStore;
}

export let GameSocialReducers: ActionReducerMap<GameSocialState> = {
  appStore,
  userStore,
  playlistStore,
  friendsStore,
  playerStore
};

export let GameSocialActions = [
  AppActionTypes,
  UserActionTypes,
  PlaylistActionTypes,
  FriendsActionTypes,
  PlayerActionTypes
];
