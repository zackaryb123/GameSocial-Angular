import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {Observable} from 'rxjs';
import {AppService} from '../../../services/app/app.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'profile-chat',
  templateUrl: './profile-chat.component.html',
  styleUrls: ['./profile-chat.component.scss']
})
export class ProfileChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  chatId$ = this.appService.chatId$;
  chatId: string;

  constructor(
    private appService: AppService,
    public chatService: ChatService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // const chatId = this.route.snapshot.paramMap.get('id');
    this.chatId$.pipe(first()).subscribe(id => {
      this.chatId = id;
      this.chat$ = this.chatService.get(id);
    });
    // this.chat$ = this.chatService.joinUsers(source);
  }

  submit() {
    this.chatService.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }
}
