import { ActionReducerMap } from '@ngrx/store';

// reducers
import {IAppStore, appStore, AppActionTypes} from './app';

// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface GameSocialState {
  appStore: IAppStore;
}

export let GameSocialReducers: ActionReducerMap<GameSocialState> = {
  appStore
};

export let GameSocialActions = [
  AppActionTypes
];
