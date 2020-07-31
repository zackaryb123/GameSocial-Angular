import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';
import {AppService} from '../../../services/app/app.service';
import {PlaylistService} from "../../../services/playlist/playlist.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
    <div id="sidebar" class="sidebar ux-maker"
         [class.closed]="sidebarToggle$ | async">
      <div class="sidebar-backdrop" (click)="toggleSidebar()"></div>
      <nav class="navbar navbar-transparent">
        <app-brand></app-brand>
<!--        <app-navigator-->
<!--          page="home"-->
<!--          iconLink="videos"-->
<!--          iconLabel="Clips"-->
<!--          iconName="film"-->
<!--          [closed]="sidebarToggle$ | async">-->
<!--        </app-navigator>-->
        <app-navigator
          iconLink="playlist"
          iconLabel="Playlist"
          iconName="film"
          dropDown="true"
          [dropDownList]="playlist$ | async"
          [closed]="sidebarToggle$ | async"
          [searchType]="searchType$"
          (selectNewPlaylist)="getNewPlaylist($event)"
        >
        </app-navigator>
      </nav>

      <app-playlist [playlist]="playlist$ | async"></app-playlist>

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
  playlist$: Observable<any>;
  sidebarToggle$ = this.appService.sidebarToggle$;
  searchType$ = '';

  constructor(
    private appService: AppService,
    private playlistService: PlaylistService
  ) {
    this.playlist$ = this.playlistService.playlists$;
  }

  getNewPlaylist(id) {
    console.log('getNewPlaylist: ', id);
  }

  toggleSidebar() {
    // this.appSidebarProxy.toggleSidebar();
    this.appService.toggleSidebar();
  }

  ngOnInit() {
  }
}


