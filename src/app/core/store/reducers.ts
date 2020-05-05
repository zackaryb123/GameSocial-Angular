import { ActionReducerMap } from '@ngrx/store';

// reducers
import {IAppStore, appReducer, AppActionTypes} from './app';

// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface GameSocialState {
  appReducer: IAppStore;
}

export let GameSocialReducers: ActionReducerMap<GameSocialState> = {
  appReducer
};

export let GameSocialActions = [
  AppActionTypes
];
