import {migrateReducerState} from '../store.utils';
import {AppAction, AppActionTypes} from './app-actions';


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

export function appReducer(
  state: IAppStore = initialState,
  action: AppAction
): IAppStore {
  switch (action.type) {
    case AppActionTypes.SIDEBAR_EXPAND:
      return { ...state, sidebarExpanded: true };

    case AppActionTypes.SIDEBAR_COLLAPSE:
      return { ...state, sidebarExpanded: false };

    case AppActionTypes.SIDEBAR_TOGGLE:
      return { ...state, sidebarExpanded: !state.sidebarExpanded };
  }
}

