import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../../../services/app/app.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'profile-chat',
  templateUrl: './profile-chat.component.html',
  styleUrls: ['./profile-chat.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProfileChatComponent implements OnInit, OnChanges {
  chat$: Observable<any>;
  newMsg: string;
  chatId$ = this.appService.chatId$;
  chatId: string;

  constructor(
    private appService: AppService,
    public chatService: ChatService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams) {
        this.chatId = routeParams.uid;
        this.chat$ = this.chatService.get(routeParams.uid);
      }
    });
    // const chatId = this.route.snapshot.paramMap.get('uid');
    // this.chat$ = this.chatService.get(chatId);
    // this.chat$ = this.chatService.joinUsers(source);
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
}
