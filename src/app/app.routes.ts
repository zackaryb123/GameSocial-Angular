import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth';
import { HomePage } from './core/components/home/home.page';
import { ProfilePage} from './core/components/profile/profile.page';
import { AuthResolver } from './core/services/auth';
import {AppVideosComponent} from './core/components/home/app-search/app-videos/app-videos.component';
import {AccessPage} from './core/components/access/access.page';
import {ProfileChatComponent} from './core/components/profile/profile-chat/profile-chat.component';
import {ProfileFriendsComponent} from './core/components/profile/profile-friends/profile-friends.component';
import {ProfileUploadsComponent} from './core/components/profile/profile-uploads/profile-uploads.component';

export const rootRouterConfig: Routes = [
  { path: '',               component: AccessPage, resolve: [AuthResolver], runGuardsAndResolvers: 'always' },
  { path: 'home',           component: HomePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: 'videos',         component: AppVideosComponent,        outlet: 'home'},
      { path: 'uploads',        component: ProfileUploadsComponent,   outlet: 'home' },
    ]},
  { path: 'profile',        component: ProfilePage, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: ':uid',           component: ProfileChatComponent,      outlet: 'chat' },
      { path: '',               component: ProfileFriendsComponent,   outlet: 'user' },
    ]
  },
];
