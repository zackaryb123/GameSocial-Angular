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
import {ChatNotificationService} from './notification/chat-notification.service';
import {XboxService} from './3rd-party/microsoft/xbox.service';
import {GameClipsService} from './game-clips/game-clips.service';
import {CommentsService} from './comments/comments.service';
import {StatisticsService} from './statistics/statistics-service.service';

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
  ChatService,
  ChatNotificationService,
  XboxService,
  GameClipsService,
  CommentsService,
  StatisticsService

];
