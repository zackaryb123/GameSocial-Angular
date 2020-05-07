import {Store} from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AppStore from '../store/app/index';
import {GameSocialState} from '../store/reducers';
import {getSidebarCollapsed} from '../store/app';

// Actions

@Injectable()
export class AppDispatcher {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  // sidebarCollapsed$ = this.store.select(appStore => appStore.appStore.sidebarExpanded);


  constructor(private store: Store<GameSocialState>) { }

  toggleSidebar() {
    this.store.dispatch(new AppStore.ToggleSidebar());
  }
}
