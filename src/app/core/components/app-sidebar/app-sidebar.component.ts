import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {getSidebarCollapsed} from '../../store/app';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';
import {AppDispatcher} from '../../dispatcher/app.dispatcher';


@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarCollapsed$ | async">
    <div class="sidebar-backdrop" (click)="toggleSidebar()"></div>
    <nav class="navbar navbar-transparent">
      <app-brand></app-brand>
      <app-navigator
        iconLink="explore"
        iconLabel="Explore"
        iconName="globe"
        [closed]="sidebarCollapsed$ | async"
        [searchType]="searchType$">
      </app-navigator>
    </nav>

<!--    <now-playing></now-playing>-->

    <nav class="navbar navbar-transparent">
      <app-navigator
        iconLabel="Logout"
        iconName="sign-out"
        [closed]="sidebarCollapsed$ | async">
      </app-navigator>
    </nav>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppSidebarComponent implements OnInit {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  searchType$ = '';

  constructor(
    private appSidebarProxy: AppSidebarProxy,
    private store: Store<GameSocialState>,
    private appDispatch: AppDispatcher,
  ) {
  }

  toggleSidebar() {
    // this.appSidebarProxy.toggleSidebar();
    this.appDispatch.toggleSidebar();
  }

  ngOnInit() {
  }
}

@Injectable()
export class AppSidebarProxy {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);

  constructor(private store: Store<GameSocialState>, private appDispatcher: AppDispatcher) {}

  toggleSidebar() {
    this.appDispatcher.toggleSidebar();
  }
}

