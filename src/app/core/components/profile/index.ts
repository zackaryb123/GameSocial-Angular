import {ProfilePage} from './profile.page';
import {ProfileSidebarComponent} from './profile-sidebar/profile-sidebar.component';
import {ProfileBrandComponent} from './profile-sidebar/profile-brand/profile-brand.component';
import {ProfileNavbarComponent} from './profile-navbar/profile-navbar.component';
import {ProfileNavbarMenuComponent} from './profile-navbar/profile-navbar-menu/profile-navbar-menu.component';
import {ProfileChatComponent} from './profile-chat/profile-chat.component';
import {ProfileFriendsList} from './profile-sidebar/profile-friends/profile-friends';
import {FriendsComponent} from './profile-sidebar/profile-friends/friends/friends.component';
import {FriendsTrackComponent} from './profile-sidebar/profile-friends/friends/friends-track.component';
import {FriendsFilterComponent} from './profile-sidebar/profile-friends/friends-filter/friends-filter.component';
import {ProfileNavigatorComponent} from './profile-sidebar/profile-navigator/profile-navigator.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {UserFriendsComponent} from './profile-user/user-friends/user-friends.component';
import {UserHeaderComponent} from './profile-user/user-header/user-header.component';

export const PROFILE_COMPONENTS = [
  // PROFILE
  ProfilePage,
  ProfileSidebarComponent,
  ProfileBrandComponent,
  ProfileNavbarComponent,
  ProfileNavbarMenuComponent,
  ProfileChatComponent,
  ProfileNavigatorComponent,
  ProfileFriendsList,
  FriendsComponent,
  FriendsTrackComponent,
  FriendsFilterComponent,
  ProfileUserComponent,
  UserFriendsComponent,
  UserHeaderComponent,
];
