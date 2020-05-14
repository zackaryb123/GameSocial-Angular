import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth';
import { HomePage } from './core/components/home/home.page';
import { ProfilePage} from './core/components/profile/profile.page';
import { DiscoverPage } from './core/components/discover/discover.page';
import { AuthResolver } from './core/services/auth';
import {AppVideosComponent} from './core/components/home/app-search/app-videos/app-videos.component';
import {AccessPage} from './core/components/access/access.page';

export const rootRouterConfig: Routes = [
  { path: '',               component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home',           component: HomePage,
    // canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: 'videos',         component: AppVideosComponent,      outlet: 'home'},
      { path: 'playlist',       component: AppVideosComponent,      outlet: 'home'},
      { path: 'albums',         component: AppVideosComponent,      outlet: 'home'},
    ]},
  { path: 'profile',        component: ProfilePage,
    // canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      // { path: 'dashboard',      component: DashboardComponent,      outlet: 'profile' },
      // { path: 'user',           component: UserComponent,           outlet: 'profile' },
      // { path: 'table',          component: TableComponent,          outlet: 'profile' },
      // { path: 'typography',     component: TypographyComponent,     outlet: 'profile' },
      // { path: 'icons',          component: IconsComponent,          outlet: 'profile' },
      // { path: 'maps',           component: MapsComponent,           outlet: 'profile' },
      // { path: 'notifications',  component: NotificationsComponent,  outlet: 'profile' },
      // { path: 'upgrade',        component: UpgradeComponent,        outlet: 'profile' }
    ]
  },
  { path: 'discover',        component: DiscoverPage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
];
