import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerActionTypes {
  static PLAY = '[PLAYER] PLAY';
  static PAUSE = '[PLAYER] PAUSE';
  static SETUP_PLAYER = '[PLAYER] SETUP_PLAYER';
  static LOAD_AND_PLAY = '[PLAYER] LOAD_AND_PLAY';
  static QUEUE = '[PLAYER] REMOVE';
  static PLAY_STARTED = '[PLAYER] PLAY_STARTED';
  static TOGGLE_PLAYER = '[PLAYER] TOGGLE_PLAYER';
  static UPDATE_STATE = '[PLAYER] STATE_CHANGE';
  static PLAYER_STATE_CHANGE = '[PLAYER] PLAYER_STATE_CHANGE';
  static FULLSCREEN = '[PLAYER] FULLSCREEN';
  static RESET = '[PLAYER] RESET';
  static LOAD_NEXT_TRACK = '[PLAYER] LOAD_NEXT_TRACK';
  static RESET_FULLSCREEN = '[PLAYER] RESET_FULLSCREEN';
}

export interface IPlayerAction {
  type: any;
  payload?: any;
  media?: any;
}

export class PlayVideo implements Action {
  public type = PlayerActionTypes.PLAY;
  constructor(public payload: any) {}
}

export class PauseVideo implements Action {
  public type = PlayerActionTypes.PAUSE;
  constructor(public payload = '') {}
}

export class TogglePlayer implements Action {
  public type = PlayerActionTypes.TOGGLE_PLAYER;
  constructor(public payload: boolean = true) {}
}

export class LoadNextTrack implements Action {
  public type = PlayerActionTypes.LOAD_NEXT_TRACK;
  public payload = '';
}

export class LoadAndPlay implements Action {
  public type = PlayerActionTypes.LOAD_AND_PLAY;
  constructor(public payload: any) {}
}

export class PlayStarted implements Action {
  public type = PlayerActionTypes.PLAY_STARTED;
  constructor(public payload: any) {}
}

export class UpdateState implements Action {
  public type = PlayerActionTypes.UPDATE_STATE;
  constructor(public payload: number) {}
}

export class FullScreen implements Action {
  public type = PlayerActionTypes.FULLSCREEN;
  public payload = '';
}

export class ResetFullScreen implements Action {
  public type = PlayerActionTypes.RESET_FULLSCREEN;
  public payload = '';
}

export class Reset implements Action {
  public type = PlayerActionTypes.RESET;
  public payload = '';
}

export class SetupPlayer implements Action {
  public type = PlayerActionTypes.SETUP_PLAYER;
  constructor(public payload: any) {}
}

export class PlayerStateChange implements Action {
  public type = PlayerActionTypes.PLAYER_STATE_CHANGE;
  constructor(public payload: any) {}
}

