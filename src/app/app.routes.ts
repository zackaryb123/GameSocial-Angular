import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.guard';
import { AccessPage } from './pages/access/access.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage} from './pages/profile/profile.page';
import { DiscoverPage } from './pages/discover/discover.page';
import { AuthResolver } from './core/services/auth/auth.resolver';
import { RefreshPage } from './pages/refresh/refresh.page';

export const rootRouterConfig: Routes = [
  { path: '', component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'discover', component: DiscoverPage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'refresh', component: RefreshPage}
];
