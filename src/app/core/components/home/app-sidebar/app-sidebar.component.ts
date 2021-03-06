import {ChangeDetectionStrategy, Component, Injectable, Input, OnInit} from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';


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
        <app-navigator
          iconLink="playlist"
          iconLabel="Playlist"
          iconName="film"
          dropDown="true"
          [auth]="auth"
          [dropDownList]="playlist$ | async"
          [closed]="sidebarToggle$ | async"
          [searchType]="searchType$"
          (selectNewPlaylist)="getNewPlaylist($event)">
        </app-navigator>
      </nav>

      <app-playlist
        [authId]="auth.uid"
        [selectedPlaylist]="selectedPlaylist$ | async">
      </app-playlist>

      <!--    <nav class="navbar navbar-transparent">-->
      <!--      <app-navigator-->
      <!--        iconLabel="Logout"-->
      <!--        iconName="sign-out"-->
      <!--        [closed]="sidebarToggle$ | async">-->
      <!--      </app-navigator>-->
      <!--    </nav>-->
    </div>
  `,
})

export class AppSidebarComponent implements OnInit {
  @Input() auth;
  playlist$: Observable<any>;
  selectedPlaylist$: Observable<any>;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  sidebarToggle$ = this.appService.sidebarToggle$;
  searchType$ = '';

  constructor(
    private appService: AppService,
    private playlistService: PlaylistService
  ) {
    this.playlist$ = this.playlistService.playlists$;
  }

  getNewPlaylist(id) {
    this.playlistService.updatePlaylistIndex(id);
    this.selectedPlaylist$ = this.playlistService.watchPlaylistById(id).pipe(takeUntil(this.unsubscribe$), distinctUntilChanged());
  }

  toggleSidebar() {
    // this.appSidebarProxy.toggleSidebar();
    this.appService.toggleSidebar();
  }

  ngOnInit() {
  }
}


