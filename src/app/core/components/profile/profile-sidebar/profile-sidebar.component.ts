import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';
import {AppService} from '../../../services/app/app.service';


@Component({
  selector: 'profile-sidebar',
  styleUrls: ['./profile-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarToggle$ | async">
    <div class="sidebar-backdrop" (click)="toggleSidebar()"></div>
    <nav class="navbar navbar-transparent">
      <profile-brand></profile-brand>
<!--      <app-navigator-->
<!--        page="profile"-->
<!--        iconLink="chat"-->
<!--        iconLabel="Chat"-->
<!--        iconName="envelope"-->
<!--        [closed]="sidebarToggle$ | async">-->
<!--      </app-navigator>-->
      <profile-navigator
        page="profile"
        iconLink="friends"
        iconLabel="Friends"
        iconName="users"
        [closed]="sidebarToggle$ | async">
      </profile-navigator>
    </nav>
    <profile-friends-list></profile-friends-list>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSidebarComponent implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  searchType$ = '';

  constructor(
    private appService: AppService,
  ) {
  }

  toggleSidebar() {
    // this.appSidebarProxy.toggleSidebar();
    this.appService.toggleSidebar();
  }

  ngOnInit() {
  }
}


