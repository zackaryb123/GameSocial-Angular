import {migrateReducerState} from '../store.utils';
import {AppAction, AppActionTypes} from './app-actions';
import {createSelector, Store} from '@ngrx/store';
import {GameSocialState} from '../reducers';
import {createFeatureSelector} from '@ngrx/store';


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
  console.log('initialState: ', initialState, 'action.type: ', action.type);
  console.log(AppActionTypes.SIDEBAR_TOGGLE);
  console.log(action.type === AppActionTypes.SIDEBAR_TOGGLE);
  switch (action.type) {
    case AppActionTypes.SIDEBAR_EXPAND:
      return { ...state, sidebarExpanded: true };

    case AppActionTypes.SIDEBAR_COLLAPSE:
      return { ...state, sidebarExpanded: false };

    case AppActionTypes.SIDEBAR_TOGGLE:
      console.log('Reducer: state', state);
      return { ...state, sidebarExpanded: !state.sidebarExpanded };
    default: {
      return state;
    }
  }
}

export const getAppReducer = (state: GameSocialState) => state.appStore;
console.log('getAppStore: ', getAppReducer);

export const appStoreState = createFeatureSelector<GameSocialState, IAppStore>(
  'appStore' // feature root
);

export const getSidebarCollapsed = createSelector(
  appStoreState,
  (state: IAppStore) => {
    console.log('getSidebarCollapsed: state: ', state);
    return !state.sidebarExpanded;
  }
);
