import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class FriendsActionTypes {
  static ADD = '[FRIENDS] ADD';
  static SELECT = '[FRIENDS] SELECT';
  static REMOVE = '[FRIENDS] REMOVE';
  static FILTER_CHANGE = '[FRIENDS] FILTER_CHANGE';
}

export interface IFriendsAction {
  type: any;
  friend?: any;
  friends?: any;
  friendId?: any;
  filter?: any;
}
export class AddFriend implements Action {
  public type = FriendsActionTypes.ADD;
  constructor(
    public friend: any,
    public friendId: string
  ) {}
}
export class RemoveFriend implements Action {
  public type = FriendsActionTypes.REMOVE;
  constructor(
    public friend: any
  ) {}
}
export class FilterChange implements Action {
  public type = FriendsActionTypes.FILTER_CHANGE;
  constructor(public filter: string) {}
}
export class SelectFriend implements Action {
  public type = FriendsActionTypes.SELECT;
  constructor(public friendId: any) {}
}

