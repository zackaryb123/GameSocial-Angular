import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';
import {AppDispatcher} from '../../dispatcher/app.dispatcher';


@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarToggle$ | async">
    <div class="sidebar-backdrop" (click)="toggleSidebar()"></div>
    <nav class="navbar navbar-transparent">
      <app-brand></app-brand>
      <app-navigator
        iconLink="explore"
        iconLabel="Explore"
        iconName="globe"
        [closed]="sidebarToggle$ | async"
        [searchType]="searchType$">
      </app-navigator>
    </nav>

<!--    <now-playing></now-playing>-->

    <nav class="navbar navbar-transparent">
      <app-navigator
        iconLabel="Logout"
        iconName="sign-out"
        [closed]="sidebarToggle$ | async">
      </app-navigator>
    </nav>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppSidebarComponent implements OnInit {
  sidebarToggle$ = this.appDispatch.sidebarToggle$;
  searchType$ = '';

  constructor(
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


