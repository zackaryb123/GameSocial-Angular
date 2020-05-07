import {Component, OnInit} from '@angular/core';
import {AppDispatcher} from '../../dispatcher/app.dispatcher';
import {getSidebarCollapsed} from '../../store/app/app-selectors';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';


@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  templateUrl: './app-brand.component.html',
})
export class AppBrandComponent implements OnInit {
  // sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  constructor(
    private store: Store<GameSocialState>,
    private appDispatch: AppDispatcher,
  ) { }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appDispatch.toggleSidebar();
  }
}
