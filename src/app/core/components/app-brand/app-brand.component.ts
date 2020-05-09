import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app/app.service';
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
    private appDispatch: AppService,
  ) { }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appDispatch.toggleSidebar();
  }
}
