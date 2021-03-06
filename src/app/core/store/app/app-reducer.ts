import {migrateReducerState} from '../store.utils';
import {AppActionTypes, IAppAction} from './app-actions';

export interface IAppStore {
  chatId: string;
  sidebarToggle: boolean;
  searchQuery: string;
  showModal: {
    addToPlaylist: boolean;
    media: any;
    status: 'loading' | 'none'
  };
  filter: string;
}
const newInitialState: IAppStore = {
  chatId: '',
  sidebarToggle: true,
  searchQuery: '',
  showModal: {
    addToPlaylist: false,
    media: undefined,
    status: 'none'
  },
  filter: ''
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
    case AppActionTypes.SET_CHAT_ID:
      return { ...state, chatId: action.id };
    case AppActionTypes.UPDATE_FILTER:
      return { ...state, filter: action.filter };
    case AppActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case AppActionTypes.SHOW_MODAL:
      return;

    case AppActionTypes.CLOSE_MODAL: {
      const media = action.media || undefined;
      return {
        ...state,
        showModal: {
          ...state.showModal,
          addToPlaylist: action.payload,
          media
        }
      };
    }

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
