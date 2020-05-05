import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class AppActionTypes {
  static SIDEBAR_EXPAND = '[APP] SIDEBAR_EXPAND';
  static SIDEBAR_COLLAPSE = '[APP CORE] SIDEBAR_COLLAPSE';
  static SIDEBAR_TOGGLE = '[APP CORE] SIDEBAR_TOGGLE';
}

export class ExpandSidebar implements Action {
  public type = AppActionTypes.SIDEBAR_EXPAND;
  public payload = true;
}

export class CollapseSidebar implements Action {
  public type = AppActionTypes.SIDEBAR_COLLAPSE;
  public payload = false;
}

export class ToggleSidebar implements Action {
  public type = AppActionTypes.SIDEBAR_TOGGLE;
  public payload = '';
}

export type AppAction =
  | ExpandSidebar
  | CollapseSidebar
  | ToggleSidebar;
