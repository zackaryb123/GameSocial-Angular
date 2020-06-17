import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {IUserStore} from './user-reducer';

@Injectable()
export class UserActionTypes {
  static UPDATE_USER_INFO = '[USER] UPDATE_USER_INFO';
  static SET_USER_INFO = '[USER] SET_USER_INFO';
}

export interface IUserAction {
  type: any;
  user?: any;
}

export class UpdateUsereData implements Action {
  public type = UserActionTypes.UPDATE_USER_INFO;
  constructor() {}
}

export class SetUserData implements Action {
  public type = UserActionTypes.SET_USER_INFO;
  constructor(public user: IUserStore) {}
}
