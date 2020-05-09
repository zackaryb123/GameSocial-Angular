import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class ProfileActionTypes {
  static UPDATE_PROFILE_DATA = '[PROFILE] UPDATE_PROFILE_DATA';
}

export interface IProfileAction {
  type: any;
  payload?: any;
}

export class UpdateProfileData implements Action {
  public type = ProfileActionTypes.UPDATE_PROFILE_DATA;
  constructor() {}
}
