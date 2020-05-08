import {Store} from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AppStore from '../store/app/index';
import {GameSocialState} from '../store/reducers';
import {getSearchQuery, getSidebarToggle} from '../store/app/app-selectors';

// Actions

@Injectable()
export class AppDispatcher {
  sidebarToggle$ = this.store.select(getSidebarToggle);
  searchQuery$ = this.store.select(getSearchQuery);

  constructor(private store: Store<GameSocialState>) { }

  toggleSidebar() {
    this.store.dispatch(new AppStore.ToggleSidebar());
  }

  updateSearchQuery(query: string) {
    this.store.dispatch(new AppStore.UpdateSearchQuery(query));
  }
}
