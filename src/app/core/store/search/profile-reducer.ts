import {migrateReducerState} from '../store.utils';
import {IProfileAction, ProfileActionTypes} from './profile-actions';

export interface IProfileStore {
  data: {};
}
const newInitialState: IProfileStore = {
  data: {}
};

const initialState: IProfileStore = migrateReducerState(
  'appLayout',
  newInitialState,
  localStorage
);

export function profileStore(
  state: IProfileStore = initialState,
  action: IProfileAction
): IProfileStore {
  switch (action.type) {
    case ProfileActionTypes.UPDATE_PROFILE_DATA:
      return { ...state, data: {} };
    default: {
      return {
        ...initialState,
        ...state
      };
    }
  }
}
