import {AuthGuard, AuthResolver, AuthService} from './auth';
import {UserGuard, UserService} from './user';
import {AppService} from './app/app.service';
import {PlaylistService} from './playlist/playlist.service';
import {PlayerService} from './player/player.service';

export const SERVICES = [
  AuthGuard,
  AuthResolver,
  AuthService,
  UserGuard,
  UserService,
  AppService,
  PlaylistService,
  PlayerService,
];
