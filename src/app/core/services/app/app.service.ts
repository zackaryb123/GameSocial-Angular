import {Store} from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AppStore from '../../store/app';
import {GameSocialState} from '../../store/reducers';
import {getChatId, getSearchQuery, getShowModal, getSidebarToggle} from '../../store/app';

@Injectable()
export class AppService {
  sidebarToggle$ = this.store.select(getSidebarToggle);
  searchQuery$ = this.store.select(getSearchQuery);
  showModal$ = this.store.select(getShowModal);
  chatId$ = this.store.select(getChatId);

  constructor(private store: Store<GameSocialState>) {}

  toggleSidebar() {
    this.store.dispatch(new AppStore.ToggleSidebar());
  }

  toggleModal(show = true, media = {}) {
    this.store.dispatch(show ? new AppStore.ShowModal(media) : new AppStore.CloseModal());
  }

  updateSearchQuery(query: string) {
    this.store.dispatch(new AppStore.UpdateSearchQuery(query));
  }

  setChatId(id) {
    this.store.dispatch(new AppStore.SetChatId(id));
  }
}
