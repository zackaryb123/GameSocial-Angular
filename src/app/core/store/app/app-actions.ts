import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class AppActionTypes {
  static SIDEBAR_TOGGLE = '[APP] SIDEBAR_TOGGLE';
  static UPDATE_SEARCH_QUERY = '[APP] UPDATE_SEARCH_QUERY';
}

export interface IAppAction {
  type: any;
  payload?: any;
}

export class ToggleSidebar implements Action {
  public type = AppActionTypes.SIDEBAR_TOGGLE;
}

export class UpdateSearchQuery implements Action {
  public type = AppActionTypes.UPDATE_SEARCH_QUERY;
  constructor(public payload: string) {}
}
