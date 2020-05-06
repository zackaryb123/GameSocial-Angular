import {migrateReducerState} from '../store.utils';
import {AppAction, AppActionTypes} from './app-actions';
import {Store} from '@ngrx/store';


export interface IAppStore {
  sidebarExpanded: boolean;
}
const newInitialState: IAppStore = {
  sidebarExpanded: true
};

const initialState: IAppStore = migrateReducerState(
  'appLayout',
  newInitialState,
  localStorage
);

export function appStore(
  state: IAppStore = initialState,
  action: AppAction
): IAppStore {
  console.log('initialState: ', initialState);
  switch (action.type) {
    case AppActionTypes.SIDEBAR_EXPAND:
      return { ...state, sidebarExpanded: true };

    case AppActionTypes.SIDEBAR_COLLAPSE:
      return { ...state, sidebarExpanded: false };

    case AppActionTypes.SIDEBAR_TOGGLE:
      return { ...state, sidebarExpanded: !state.sidebarExpanded };
  }
}

export function getSidebarExpanded($state: Store<IAppStore>) {
  return $state.select(state => state.sidebarExpanded);
}

