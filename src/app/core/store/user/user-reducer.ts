import {migrateReducerState} from '../store.utils';
import {IUserAction, UserActionTypes} from './user-actions';
import {IFriends} from '../friends';

export interface IUserStore {
  info?: {
    avatar?: string;
    fname?: string;
    lname?: string
    tag?: string;
    uid?: string;
  };
  friends?: IFriends[];
}
const newInitialState: IUserStore = {
  info: null,
  friends: []
};

const initialState: IUserStore = migrateReducerState(
  'prevUserLayout',
  newInitialState,
  localStorage
);

export function userStore(
  state: IUserStore = initialState,
  action: IUserAction
): IUserStore {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_INFO:
      return { ...state, info: {} };
    default: {
      return {
        ...initialState,
        ...state
      };
    }
  }
}
