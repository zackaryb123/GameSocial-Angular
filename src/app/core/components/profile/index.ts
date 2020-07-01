import {ProfilePage} from './profile.page';
import {ProfileSidebarComponent} from './profile-sidebar/profile-sidebar.component';
import {ProfileSidebarBrandComponent} from './profile-sidebar/profile-sidebar-brand/profile-sidebar-brand.component';
import {ProfileNavbarComponent} from './profile-navbar/profile-navbar.component';
import {ProfileNavbarMenuComponent} from './profile-navbar/profile-navbar-menu/profile-navbar-menu.component';
import {ProfileChatComponent} from './profile-chat/profile-chat.component';
import {ProfileSidebarNavigatorComponent} from './profile-sidebar/profile-sidebar-navigator/profile-sidebar-navigator.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {UserFriendsComponent} from './profile-user/user-friends/user-friends.component';
import {UserHeaderComponent} from './profile-user/user-header/user-header.component';
import {UserDashboardComponent} from './profile-user/user-dashboard/user-dashboard.component';
import {ProfileSidebarFriends} from './profile-sidebar/profile-sidebar-friends/profile-sidebar-friends';
import {ProfileSidebarFriendsListComponent} from './profile-sidebar/profile-sidebar-friends/profile-sidebar-friends-list/profile-sidebar-friends-list.component';
import {ProfileSidebarFriendsTrackComponent} from './profile-sidebar/profile-sidebar-friends/profile-sidebar-friends-list/profile-sidebar-friends-track/profile-sidebar-friends-track.component';
import {ProfileSidebarFriendsFilterComponent} from './profile-sidebar/profile-sidebar-friends/profile-sidebar-friends-filter/profile-sidebar-friends-filter.component';
import {UserFriendsTrackComponent} from './profile-user/user-friends/user-friends-track/user-friends-track.component';

export const PROFILE_COMPONENTS = [
  // PROFILE
  ProfilePage,
  ProfileSidebarComponent,
  ProfileSidebarFriends,
  ProfileSidebarFriendsListComponent,
  ProfileSidebarFriendsTrackComponent,
  ProfileSidebarFriendsFilterComponent,
  ProfileSidebarBrandComponent,
  ProfileNavbarComponent,
  ProfileNavbarMenuComponent,
  ProfileChatComponent,
  ProfileSidebarNavigatorComponent,
  ProfileUserComponent,
  UserFriendsComponent,
  UserHeaderComponent,
  UserDashboardComponent,
  UserFriendsTrackComponent
];
