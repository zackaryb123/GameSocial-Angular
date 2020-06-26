import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {
  @Input() userFriends;

  constructor() { }

  ngOnInit(): void {
  }

}
