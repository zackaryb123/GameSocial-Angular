import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class AppActionTypes {
  static SIDEBAR_TOGGLE = '[APP] SIDEBAR_TOGGLE';
  static SHOW_MODAL = '[APP] SHOW_MODAL';
  static CLOSE_MODAL = '[APP] CLOSE_MODAL';
  static UPDATE_SEARCH_QUERY = '[APP] UPDATE_SEARCH_QUERY';
  static SET_CHAT_ID = '[APP] SET_CHAT_ID';
}

export interface IAppAction {
  type: any;
  payload?: any;
  media?: any;
  id?: any;
}

export class ToggleSidebar implements Action {
  public type = AppActionTypes.SIDEBAR_TOGGLE;
}

export class ShowModal {
  public type = AppActionTypes.SHOW_MODAL;
  constructor(public media, public payload = true) { }
}

export class CloseModal {
  public type = AppActionTypes.CLOSE_MODAL;
  constructor(public payload = false) { }
}

export class UpdateSearchQuery implements Action {
  public type = AppActionTypes.UPDATE_SEARCH_QUERY;
  constructor(public payload: string) {}
}

export class SetChatId implements Action {
  public type = AppActionTypes.SET_CHAT_ID;
  constructor(public id: string) {}
}
