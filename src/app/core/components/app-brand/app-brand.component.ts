import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppDispatcher} from '../../dispatcher/app.dispatcher';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../store/reducers';


@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  templateUrl: './app-brand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBrandComponent implements OnInit {
  sidebarToggle$ = this.appDispatch.sidebarToggle$;

  constructor(
    private store: Store<GameSocialState>,
    private appDispatch: AppDispatcher,
  ) { }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appDispatch.toggleSidebar();
  }
}
