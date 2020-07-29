import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user';

@Component({
  selector: 'message',
  styleUrls: ['./message.component.scss'],
  template: `
    <div class="d-flex" *ngIf="(altUser || authUser) && !flipped">
      <img *ngIf="isAuthUser(msg.uid)" [src]="authUser.avatar" alt="avatar" class="avatar rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1">
      <div [class.rightArrow]="isAuthUser(msg.uid)" [class.leftArrow]="!isAuthUser(msg.uid)" class="chat-body leftArrow white p-2 ml-2 z-depth-1">
        <div class="header">
          <strong *ngIf="isAuthUser(msg.uid)" class="chat-name primary-font">{{authUser.fname}} {{authUser.lname}}</strong>
          <strong *ngIf="!isAuthUser(msg.uid)" class="chat-name primary-font">{{altUser.fname}} {{altUser.lname}}</strong>
          <small class="pull-right text-muted"><i class="far fa-clock"></i>{{msg.timeStamp | dateAgo}}</small>
        </div>
        <hr class="m-1 w-100">
        <p class="chat-text mb-0">
          {{msg.comment}}
        </p>
      </div>
      <img *ngIf="!isAuthUser(msg.uid)" [src]="altUser.avatar" alt="avatar" class="avatar rounded-circle mr-0 ml-3 z-depth-1">
    </div>

    <div class="d-flex" *ngIf="(altUser || authUser) && flipped">
      <img *ngIf="isAuthUser(msg.uid)" [src]="authUser.avatar" alt="avatar" class="avatar rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1">
      <div [class.rightArrow]="isAuthUser(msg.uid)" [class.leftArrow]="!isAuthUser(msg.uid)" class="chat-body leftArrow white p-2 ml-2 z-depth-1">
        <div class="header">
          <strong *ngIf="isAuthUser(msg.uid)" class="chat-name primary-font">{{authUser.fname}} {{authUser.lname}}</strong>
          <strong *ngIf="!isAuthUser(msg.uid)" class="chat-name primary-font">{{altUser.fname}} {{altUser.lname}}</strong>
          <small class="pull-right text-muted"><i class="far fa-clock"></i>{{msg.timeStamp | dateAgo}}</small>
        </div>
        <hr class="m-1 w-100">
        <p class="chat-text mb-0">
          {{msg.comment}}
        </p>
      </div>
      <img *ngIf="!isAuthUser(msg.uid)" [src]="altUser.avatar" alt="avatar" class="avatar rounded-circle mr-0 ml-3 z-depth-1">
    </div>
  `
})
export class MessageComponent implements OnInit {
  @Input() flipped;
  @Input() msg: any;
  @Input() authUser: any;
  @Input() altUID: any;

  altUser: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.altUID) {
      this.userService.getUser(this.altUID).then(user => {
        this.altUser = user;
      });
    }
  }

  isAuthUser(msgUid: any) {
    return msgUid === this.authUser.uid;
  }

}
