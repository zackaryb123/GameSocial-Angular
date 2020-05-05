import {createSelector} from '@ngrx/store';
import {IAppStore} from './app-reducer';
import {GameSocialState} from '../reducers';


export const getAppStore = (state: GameSocialState) => state.appReducer;

export const getSidebarCollapsed = createSelector(
  getAppStore,
  (state: IAppStore) => !state.sidebarExpanded
);
