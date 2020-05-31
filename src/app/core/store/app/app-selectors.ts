import {createSelector} from '@ngrx/store';
import {IAppStore} from './app-reducer';
import {GameSocialState} from '../reducers';

export const getAppStore = (state: GameSocialState) => state.appStore;

export const getSearchQuery = createSelector(
  getAppStore,
  (appStore: IAppStore) => appStore.searchQuery
);

export const getSidebarToggle = createSelector(
  getAppStore,
  (appStore: IAppStore) => appStore.sidebarToggle
);

export const getShowModal = createSelector(
  getAppStore,
  (appStore: IAppStore) => appStore.showModal
);

