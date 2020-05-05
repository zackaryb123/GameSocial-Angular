import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppDispatcher} from '../../store/app/dispatcher';


@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  templateUrl: './app-brand.component.html',
})
export class AppBrandComponent implements OnInit {
  // @Output() sidebarCollapsed$: EventEmitter<any> = new EventEmitter();

  constructor(
    private appDispatch: AppDispatcher
  ) {
  }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appDispatch.toggleSidebar();
  }
}
