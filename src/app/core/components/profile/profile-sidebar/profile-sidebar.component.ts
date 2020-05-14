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
      <app-navigator
        iconLink="explore"
        iconLabel="Explore"
        iconName="globe"
        [closed]="sidebarToggle$ | async"
        [searchType]="searchType$">
      </app-navigator>
      <app-navigator
        iconLabel="Logout"
        iconName="sign-out"
        [closed]="sidebarToggle$ | async">
      </app-navigator>
    </nav>

<!--    <now-playing></now-playing>-->

<!--    <nav class="navbar navbar-transparent">-->
<!--      <app-navigator-->
<!--        iconLabel="Logout"-->
<!--        iconName="sign-out"-->
<!--        [closed]="sidebarToggle$ | async">-->
<!--      </app-navigator>-->
<!--    </nav>-->
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


