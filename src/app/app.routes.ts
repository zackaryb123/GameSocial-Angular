import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth';
import { AccessPage } from './pages/access/access.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage} from './pages/profile/profile.page';
import { DiscoverPage } from './pages/discover/discover.page';
import { AuthResolver } from './core/services/auth';
import {AppVideosComponent} from './core/components/home/app-search/app-videos/app-videos.component';
// import {UpgradeComponent} from './core/components/profile/upgrade/upgrade.component';
// import {NotificationsComponent} from './core/components/profile/notifications/notifications.component';
// import {MapsComponent} from './core/components/profile/maps/maps.component';
// import {IconsComponent} from './core/components/profile/icons/icons.component';
// import {TypographyComponent} from './core/components/profile/typography/typography.component';
// import {TableComponent} from './core/components/profile/table/table.component';
// import {UserComponent} from './core/components/profile/user/user.component';
// import {DashboardComponent} from './core/components/profile/dashboard/dashboard.component';

export const rootRouterConfig: Routes = [
  { path: '',               component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home',           component: HomePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: 'videos',         component: AppVideosComponent,      outlet: 'home'},
      { path: 'playlist',       component: AppVideosComponent,      outlet: 'home'},
      { path: 'albums',         component: AppVideosComponent,      outlet: 'home'},
    ]},
  { path: 'profile',        component: ProfilePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
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
