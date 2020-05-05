import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {getSidebarCollapsed} from "../../store/app";
import {Store} from "@ngrx/store";
import {GameSocialState} from "../../store/reducers";
import {AppDispatcher} from "../../store/app/dispatcher";


@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarCollapsed$">
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
        [closed]="sidebarCollapsed$ | async"
        [searchType]="searchType$">
      </app-navigator>
    </nav>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppSidebarComponent implements OnInit {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  searchType$ = '';
  // public routes = [
  //   {link: 'search', icon: 'sign-out', label: 'Explore'}
  //   // { link: '/user', icon: 'heart', label: 'My Profile' }
  // ];

  constructor(
    private store: Store<GameSocialState>,
    private appDispatch: AppDispatcher,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  toggleSidebar() {
    this.appDispatch.toggleSidebar();
    // this.sidebarCollapsed$ = value;
  }

  ngOnInit() {

  }
}

