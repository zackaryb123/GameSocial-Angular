import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AppStore from './index';
import {GameSocialState} from '../reducers';

// Actions

@Injectable()
export class AppDispatcher {
  // themes$ = this.store.select(AppCore.getAppThemes);
  // appVersion$ = this.store.select(AppCore.getAppVersion);
  // user$ = this.store.select(UserActions.getUser);
  // showAddToPlaylist$ = this.store.pipe(select(AppCore.selectShowAddToPlaylist));
  // usersPlaylists$ = this.store.pipe(select(UserActions.selectUsersPlaylists));
  // mediaToPlaylist$ = this.store.pipe(select(AppCore.selectMediaToPlaylist));

  constructor(private store: Store<GameSocialState>) { }

  toggleSidebar() {
    this.store.dispatch(new AppStore.ToggleSidebar());
  }
}
