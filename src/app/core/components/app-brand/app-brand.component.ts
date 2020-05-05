import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  templateUrl: './app-brand.component.html',
})
export class AppBrandComponent implements OnInit {
  toggleSidebar = true;
  @Output() sidebarCollapsed$: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  handleToggleSidebar() {
    this.sidebarCollapsed$.emit(!this.toggleSidebar);
    this.toggleSidebar = !this.toggleSidebar;
  }
}
