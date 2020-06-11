import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';
import {AppService} from '../../../services/app/app.service';


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
          page="home"
          iconLink="videos"
          iconLabel="Clips"
          iconName="film"
          [closed]="sidebarToggle$ | async">
        </app-navigator>
        <app-navigator
          page="home"
          iconLink="uploads"
          iconLabel="Uploads"
          iconName="upload"
          [closed]="sidebarToggle$ | async">
        </app-navigator>
        <app-navigator
          iconLink="playlist"
          iconLabel="Playlist"
          iconName="film"
          dropDown="true"
          [closed]="sidebarToggle$ | async"
          [searchType]="searchType$">
        </app-navigator>
      </nav>

      <app-playlist></app-playlist>

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

export class AppSidebarComponent implements OnInit {
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


