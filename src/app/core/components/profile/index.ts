import {ProfilePage} from './profile.page';
import {ProfileSidebarComponent} from './profile-sidebar/profile-sidebar.component';
import {ProfileBrandComponent} from './profile-brand/profile-brand.component';
import {ProfileNavbarComponent} from './profile-navbar/profile-navbar.component';
import {ProfileNavbarMenuComponent} from './profile-navbar/profile-navbar-menu/profile-navbar-menu.component';
import {ProfileChatComponent} from './profile-chat/profile-chat.component';
import {ProfileFriendsComponent} from './profile-friends/profile-friends.component';
import {ProfileUploadsComponent} from './profile-uploads/profile-uploads.component';
import {ProfileFriendsList} from './profile-sidebar/profile-friends/profile-friends';
import {FriendsComponent} from './profile-sidebar/profile-friends/friends/friends.component';
import {FriendsTrackComponent} from './profile-sidebar/profile-friends/friends/friends-track.component';
import {FriendsFilterComponent} from './profile-sidebar/profile-friends/friends-filter/friends-filter.component';

export const PROFILE_COMPONENTS = [
  // PROFILE
  ProfilePage,
  ProfileSidebarComponent,
  ProfileBrandComponent,
  ProfileNavbarComponent,
  ProfileNavbarMenuComponent,
  ProfileChatComponent,
  ProfileFriendsComponent,
  ProfileUploadsComponent,
  ProfileFriendsList,
  FriendsComponent,
  FriendsTrackComponent,
  FriendsFilterComponent
];
