import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../../services/user';
import { Router} from '@angular/router';
import {PresenceService} from '../../../../../services/presence/presence.service';

@Component({
  selector: 'user-friends-track',
  styleUrls: ['./user-friends-track.component.scss'],
  template: `
    <div *ngIf="userInfo as user" class="friend-card">
      <img src="https://via.placeholder.com/400x100/6495ED" alt="profile-cover" class="img-responsive cover">
      <!--  <div class="card-header"></div>-->
      <div class="card-info">
        <img (click)="goProfile(user.uid)" [src]="user.avatar" alt="user" class="profile-photo-lg">
        <div class="friend-info">
          <span *ngIf="enablePresence && presence$ | async as presence" [ngClass]="{
          'is-online':  presence.status  === 'online',
          'is-away': presence.status  === 'away',
          'is-offline':  presence.status  === 'offline'
          }" class="pull-right">{{presence.status.toUpperCase()}}</span>
          <h5><span class="profile-link">{{user.name}}</span></h5>
          <p class="tag">{{user.gamertag}}</p>
        </div>
      </div>
    </div>
  `
})
export class UserFriendsTrackComponent implements OnInit {
  @Input() user;
  @Input() enablePresence: boolean;
  userInfo: any;
  presence$: any;

  constructor(
    private userService: UserService,
    private presenceService: PresenceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userInfo = this.userService.getUser(this.user.uid).then(user => {
      this.userInfo = user;
    });
    if (this.enablePresence) {
      this.presence$ = this.presenceService.getPresence(this.user.uid);
    }
  }

  goProfile(uid) {
    return this.router.navigateByUrl(`/profile/(user:${uid})`);
  }

}
