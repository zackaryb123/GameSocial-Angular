import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AppService} from '../../../services/app/app.service';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../services/auth';
import {UserService} from '../../../services/user';

@Component({
  selector: 'profile-chat',
  templateUrl: './profile-chat.component.html',
  styleUrls: ['./profile-chat.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileChatComponent implements OnInit, OnChanges {
  chat$: Observable<any>;
  newMsg: string;
  chatId: string;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  authUser: any;
  altUser: any;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private chatService: ChatService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.authUser = await this.authService.getAuthUser();

    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(routeParams => {
        if (routeParams) {
        this.chatId = routeParams.uid;
        this.chat$ = this.chatService.get(routeParams.uid);
        this.chat$.pipe(first()).toPromise().then( chat => {
          console.log('chat: ', chat);
          // this.altUser = await
          this.getChatUsersInfo(chat.uids).then(user => {
            this.altUser = user;
          });
        });
      }
    });
  }

  ngOnChanges({chat$}: SimpleChanges): void {
  }

  submit() {
    this.chatService.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.timeStamp;
  }

  trackByUid(i, user) {
    return user.uid;
  }

  isAuthUser(msgUid: any) {
    return msgUid === this.authUser.uid;
  }

   async getChatUsersInfo(userArray: string[]) {
    const altUid = userArray.filter(id => id !== this.authUser.uid)[0];
    return await this.userService.getUser(altUid);
  }
}
