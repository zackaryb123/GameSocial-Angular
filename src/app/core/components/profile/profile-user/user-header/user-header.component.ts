import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  @Input() auth;
  @Input() user;
  @Input() userFriends;

  activeTab = 'tab1';
  notificationStyle = {
    top: '-10px',
    left: '17px'
  };
  @Output() selectedTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tab) {
    this.activeTab = tab;
    this.selectedTab.emit(tab);
  }

}
