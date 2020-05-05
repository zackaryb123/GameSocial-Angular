import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarCollapsed$">
    <div class="sidebar-backdrop" (click)="toggleSidebar($event)"></div>
    <nav class="navbar navbar-transparent">
      <app-brand (sidebarCollapsed$)="toggleSidebar($event)"></app-brand>
      <app-navigator
        iconLink="explore"
        iconLabel="Explore"
        iconName="globe"
        [closed]="sidebarCollapsed$"
        [searchType]="searchType$">
      </app-navigator>
    </nav>

    <now-playing></now-playing>

    <nav class="navbar navbar-transparent">
      <app-navigator
        iconLabel="Logout"
        iconName="sign-out"
        [closed]="sidebarCollapsed$"
        [searchType]="searchType$">
      </app-navigator>
    </nav>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppSidebarComponent implements OnInit {
  sidebarCollapsed$ = false;
  searchType$ = '';
  public routes = [
    {link: 'search', icon: 'sign-out', label: 'Explore'}
    // { link: '/user', icon: 'heart', label: 'My Profile' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  toggleSidebar(value) {
    this.sidebarCollapsed$ = value;
  }

  ngOnInit() {

  }
}

