import {migrateReducerState} from '../store.utils';
import {AppActionTypes, IAppAction} from './app-actions';

export interface IAppStore {
  sidebarToggle: boolean;
  searchQuery: string;
}
const newInitialState: IAppStore = {
  sidebarToggle: true,
  searchQuery: ''
};

const initialState: IAppStore = migrateReducerState(
  'prevAppStore',
  newInitialState,
  localStorage
);

export function appStore(
  state: IAppStore = initialState,
  action: IAppAction
): IAppStore {
  switch (action.type) {
    case AppActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case AppActionTypes.SIDEBAR_TOGGLE:
      return { ...state, sidebarToggle: !state.sidebarToggle };
    default: {
      return {
        ...initialState,
        ...state
      };
    }
  }
}
