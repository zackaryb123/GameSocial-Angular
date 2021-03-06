import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth';
import {UserService} from '../../../services/user';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {FriendsService} from '../../../services/friends/friends.service';

@Component({
  selector: 'profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  loading = true;
  user: any;
  userUID: any;
  auth: any;
  userFriends: any;
  activeTab = 'tab1';
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private friendsService: FriendsService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.authService.getAuthPromise().then(auth => {
      this.auth = auth;
    });
    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe( routeParams => {
        if (routeParams) {
          this.userUID = routeParams.uid;
          this.user = this.userService.getUser(routeParams.uid);
          this.userFriends = this.friendsService.getUserFriends(routeParams.uid);
          this.loading = false;
        }
      });
  }

  selectTab(event) {
    this.activeTab = event;
  }

}
