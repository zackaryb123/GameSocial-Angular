import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth';
import { HomePage } from './core/components/home/home.page';
import { ProfilePage} from './core/components/profile/profile.page';
import { AuthResolver } from './core/services/auth';
import {AppVideosComponent} from './core/components/home/app-videos/app-videos.component';
import {AccessPage} from './core/components/access/access.page';
import {ProfileChatComponent} from './core/components/profile/profile-chat/profile-chat.component';
import {ProfileUserComponent} from './core/components/profile/profile-user/profile-user.component';

export const rootRouterConfig: Routes = [
  { path: '',               component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home',           component: HomePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: 'clips',         component: AppVideosComponent,        outlet: 'xbox'},
    ]},
  { path: 'profile',        component: ProfilePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: ':uid',           component: ProfileChatComponent,      outlet: 'chat' },
      { path: ':uid',           component: ProfileUserComponent,      outlet: 'user' },
    ]
  },
];
