import {createSelector} from '@ngrx/store';
import {IAppStore} from './app-reducer';
import {GameSocialState} from '../reducers';

export const getAppReducer = (state: GameSocialState) => state.appStore;

export const getSearchQuery = createSelector(
  getAppReducer,
  (appStore: IAppStore) => appStore.searchQuery
);

export const getSidebarToggle = createSelector(
  getAppReducer,
  (appStore: IAppStore) => !appStore.sidebarToggle
);

