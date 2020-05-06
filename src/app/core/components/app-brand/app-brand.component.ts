import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';
import {AppDispatcher} from '../../dispatcher/app.dispatcher';


@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  templateUrl: './app-brand.component.html',
})
export class AppBrandComponent implements OnInit {
  constructor(
    private appDispatch: AppDispatcher,
    // private store: Store<GameSocialState>,
  ) {
  }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appDispatch.toggleSidebar();
  }
}
