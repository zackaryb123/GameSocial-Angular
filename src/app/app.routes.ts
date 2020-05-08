import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth';
import { AccessPage } from './pages/access/access.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage} from './pages/profile/profile.page';
import { DiscoverPage } from './pages/discover/discover.page';
import { AuthResolver } from './core/services/auth';
import {AppVideosComponent} from './core/components/app-search/app-videos/app-videos.component';

export const rootRouterConfig: Routes = [
  { path: '', component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: 'videos', component: AppVideosComponent, outlet: 'home'},
      { path: 'playlist', component: AppVideosComponent, outlet: 'home'},
      { path: 'albums', component: AppVideosComponent, outlet: 'home'},
    ]},
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'discover', component: DiscoverPage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
];
