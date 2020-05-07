import {Store} from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AppStore from '../store/app/index';
import {GameSocialState} from '../store/reducers';
import {getSidebarCollapsed} from '../store/app/app-selectors';

// Actions

@Injectable()
export class AppDispatcher {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);

  constructor(private store: Store<GameSocialState>) { }

  toggleSidebar() {
    this.store.dispatch(new AppStore.ToggleSidebar());
  }
}
