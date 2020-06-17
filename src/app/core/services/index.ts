import {AuthGuard, AuthResolver, AuthService} from './auth';
import {UserGuard, UserService} from './user';
import {AppService} from './app/app.service';
import {PlaylistService} from './playlist/playlist.service';
import {PlayerService} from './player/player.service';
import {FriendsService} from './friends/friends.service';
import {MessagingService} from './messaging/messaging.service';
import {ChatService} from './chat/chat.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();
}

export const SERVICES = [
  SubscriptionService,
  AuthGuard,
  AuthResolver,
  AuthService,
  UserGuard,
  UserService,
  AppService,
  PlaylistService,
  FriendsService,
  PlayerService,
  MessagingService,
  ChatService
];
