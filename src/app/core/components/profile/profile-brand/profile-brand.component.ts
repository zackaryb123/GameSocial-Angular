import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../../store/reducers';


@Component({
  selector: 'profile-brand',
  styleUrls: ['./profile-brand.scss'],
  templateUrl: './profile-brand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBrandComponent implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;

  constructor(
    private store: Store<GameSocialState>,
    private appService: AppService,
  ) { }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appService.toggleSidebar();
  }
}
