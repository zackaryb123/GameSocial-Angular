import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() user;

  constructor() { }

  ngOnInit(): void {
  }

}
