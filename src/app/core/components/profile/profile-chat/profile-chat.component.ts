import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../../../services/app/app.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'profile-chat',
  templateUrl: './profile-chat.component.html',
  styleUrls: ['./profile-chat.component.scss']
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
    // const chatId = this.route.snapshot.paramMap.get('id');
    this.chatId$.pipe(first()).subscribe(id => {
      this.chatId = id;
      this.chat$ = this.chatService.get(id);
    });
    // this.chat$ = this.chatService.joinUsers(source);
  }

  ngOnChanges({chat$}: SimpleChanges): void {
    if (chat$) {
      console.log(chat$);
    }
  }

  submit() {
    this.chatService.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }
}
