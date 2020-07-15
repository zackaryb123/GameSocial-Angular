import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../../services/user';

@Component({
  selector: 'user-friends-track',
  templateUrl: './user-friends-track.component.html',
  styleUrls: ['./user-friends-track.component.scss']
})
export class UserFriendsTrackComponent implements OnInit {
  @Input() user;
  userInfo: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUser(this.user.uid).then(user => {
      this.userInfo = user;
    });
      // .then(user => {
      //   this.userInfo = user;
      // });
  }

}
