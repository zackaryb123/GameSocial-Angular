import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth';
import {UserService} from '../../../services/user';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  user: any;
  auth: any;
  userFriends: any;
  activeTab = 'tab1';
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  notificationStyle = {
    top: '-10px',
    left: '17px'
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe( routeParams => {
        if (routeParams) {
          this.user = this.userService.getUser(routeParams.uid);
          this.userFriends = this.userService.getUserFriends(routeParams.uid);
        }
      });
    this.auth = this.authService.getAuth().then(auth => auth);
  }

  isAuthUser() {
    console.log('isAuthUser1: ', this.auth );
    console.log('isAuthUser2: ', this.user );
    console.log('isAuthUser3: ',  this.user.uid === this.auth.uid);

    return this.auth && this.user && this.user.uid === this.auth.uid;
  }

  selectTab(tab) {
    this.activeTab = tab;
  }

}
