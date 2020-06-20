import {HomePage} from './home.page';
import {AppBrandComponent} from './app-sidebar/app-brand/app-brand.component';
import {AppNavbarMenuComponent} from './app-navbar/app-navbar-menu/app-navbar-menu.component';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {AppNavbarUserComponent} from './app-navbar/app-navbar-user/app-navbar-user.component';
import {AppVideoModalComponent} from './app-video-modal/app-video.modal.component';
import {AppVideosComponent} from './app-videos/app-videos.component';
import {AppSidebarComponent} from './app-sidebar/app-sidebar.component';
import {ImageBlurComponent} from './app-player/image-blur/image-blur.component';
import {PlayerResizerComponent} from './app-player/player-resizer/player-resizer.component';
import {MediaInfoComponent} from './app-player/media-info/media-info.component';
import {AppPlayerComponent} from './app-player/app-player.component';
import {SearchNavigatorComponent} from '../../../shared/components/search-navigator/search-navigator.component';
import {PlayerSearchComponent} from '../../../shared/components/player-search/player-search.component';
import {PlayerControlsComponent} from './app-player/player-controls/player-controls.component';
import {TrackInfoComponent} from './app-player/track-info/track-info.component';
import {PlaylistComponent} from './app-sidebar/app-playlist/playlist/playlist.component';
import {PlaylistTrackComponent} from './app-sidebar/app-playlist/playlist/playlist-track.component';
import {PlaylistFilterComponent} from './app-sidebar/app-playlist/playlist-filter/playlist-filter.component';
import {AppPlaylist} from './app-sidebar/app-playlist/app-playlist';
import {AppNavigatorComponent} from './app-sidebar/app-navigator/app-navigator.component';


export const HOME_COMPONENTS = [
  HomePage,
  AppBrandComponent,
  AppNavbarComponent,
  AppNavbarMenuComponent,
  AppNavbarUserComponent,
  PlayerSearchComponent,
  SearchNavigatorComponent,
  AppSidebarComponent,
  AppVideosComponent,
  AppVideoModalComponent,
  AppPlayerComponent,
  PlayerResizerComponent,
  ImageBlurComponent,
  MediaInfoComponent,
  PlayerControlsComponent,
  TrackInfoComponent,
  AppPlaylist,
  PlaylistComponent,
  PlaylistTrackComponent,
  PlaylistFilterComponent,
  AppNavigatorComponent
];
