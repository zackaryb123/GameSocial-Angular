import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class PlaylistActionTypes {
  static QUEUE_LOAD_VIDEO = '[PLAYLIST] QUEUE_LOAD_VIDEO';
  static QUEUE = '[PLAYLIST] QUEUE';
  static QUEUE_LOAD_VIDEO_SUCCESS = '[PLAYLIST] QUEUE_LOAD_VIDEO_SUCCESS';
  static SELECT = '[PLAYLIST] SELECT';
  static REMOVE = '[PLAYLIST] REMOVE';
  static UPDATE_INDEX = '[PLAYLIST] UPDATE_INDEX';
  static QUEUE_FAILED = '[PLAYLIST] QUEUE_FAILED';
  static FILTER_CHANGE = '[PLAYLIST] FILTER_CHANGE';
  static REMOVE_ALL = '[PLAYLIST] REMOVE_ALL';
  static SELECT_NEXT = '[PLAYLIST] SELECT_NEXT';
  static SELECT_PREVIOUS = '[PLAYLIST] SELECT_PREVIOUS';
  static QUEUE_VIDEOS = '[PLAYLIST] QUEUE_VIDEOS';
  static MEDIA_ENDED = '[PLAYLIST] MEDIA_ENDED';
  static TOGGLE_REPEAT = '[PLAYLIST] TOGGLE_REPEAT';
  static SELECT_AND_SEEK_TO_TIME = '[PLAYLIST] SELECT_AND_SEEK_TO_TIME';
  static LOAD_PLAYLIST_START = '[PLAYLIST] LOAD_PLAYLIST_START';
  static LOAD_PLAYLIST_END = '[PLAYLIST] LOAD_PLAYLIST_END';
  static PLAY_PLAYLIST = '[PLAYLIST] PLAY_PLAYLIST';
  static PLAY_PLAYLIST_START = '[PLAYLIST] PLAY_PLAYLIST_START';
  static PLAYER_STATE_CHANGE = '[PLAYLIST] PLAYER_STATE_CHANGE';
  static SORT_PLAYLIST = '[PLAYLIST] SORT ITEM';
}

export interface IPlaylistAction {
  type: any;
  payload?: any;
  media?: any;
}

export class SeekTo implements Action {
  public type = PlaylistActionTypes.SELECT_AND_SEEK_TO_TIME;
  constructor(
    public payload: { time: string; media: any }
  ) {}
}
export class QueueLoadVideo implements Action {
  public type = PlaylistActionTypes.QUEUE_LOAD_VIDEO;
  constructor(public payload: any) {}
}

export class UpdateIndexByMedia implements Action {
  public type = PlaylistActionTypes.UPDATE_INDEX;
  constructor(public payload: string) {}
}

export class QueueFailed implements Action {
  public type = PlaylistActionTypes.QUEUE_FAILED;
  constructor(public payload: any) {}
}
export class QueueVideo implements Action {
  public type = PlaylistActionTypes.QUEUE;
  constructor(public payload: any) {}
}
export class QueueVideos implements Action {
  public type = PlaylistActionTypes.QUEUE_VIDEOS;
  constructor(public payload: any[]) {}
}
export class RemoveVideo implements Action {
  public type = PlaylistActionTypes.REMOVE;
  constructor(public payload: any) {}
}

export class FilterChange implements Action {
  public type = PlaylistActionTypes.FILTER_CHANGE;
  constructor(public payload: string) {}
}
export class SelectVideo implements Action {
  public type = PlaylistActionTypes.SELECT;
  constructor(public payload: any) {}
}

export class PlayPlaylistAction implements Action {
  readonly type = PlaylistActionTypes.PLAY_PLAYLIST;
  constructor(public payload: string) {}
}
export class PlayPlaylistStartAction implements Action {
  readonly type = PlaylistActionTypes.PLAY_PLAYLIST_START;
  constructor(public payload: any) {}
}

export class LoadPlaylistAction implements Action {
  readonly type = PlaylistActionTypes.LOAD_PLAYLIST_START;
  constructor(public payload: string) {}
}

export class LoadPlaylistEndAction implements Action {
  readonly type = PlaylistActionTypes.LOAD_PLAYLIST_END;
  constructor(public payload: any[]) {}
}

export class MediaEnded implements Action {
  public type = PlaylistActionTypes.MEDIA_ENDED;
  constructor(public payload?: any) {}
}

export class SelectNext implements Action {
  public type = PlaylistActionTypes.SELECT_NEXT;
  constructor(public payload?: any) {}
}
export class SelectPrevious implements Action {
  public type = PlaylistActionTypes.SELECT_PREVIOUS;
  constructor(public payload?: any) {}
}
export class RemoveAll implements Action {
  public type = PlaylistActionTypes.REMOVE_ALL;
  constructor(public payload?: any) {}
}
export class ToggleRepeat implements Action {
  public type = PlaylistActionTypes.TOGGLE_REPEAT;
  constructor(public payload = '') {}
}

export class PlayerStateChange implements Action {
  public type = PlaylistActionTypes.PLAYER_STATE_CHANGE;
  constructor(public payload: any) {}
}

export class SortPlaylist implements Action {
  public type = PlaylistActionTypes.SORT_PLAYLIST;
  constructor(public payload: any[]) {}
}

