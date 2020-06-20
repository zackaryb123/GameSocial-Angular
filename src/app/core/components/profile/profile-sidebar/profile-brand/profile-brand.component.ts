import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app/app.service';
import {AuthService} from '../../../../services/auth';


@Component({
  selector: 'profile-brand',
  styleUrls: ['./profile-brand.scss'],
  templateUrl: './profile-brand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBrandComponent implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  authUser$ = this.authService.authUser$;

  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) { }

  ngOnInit() {
  }

  handleToggleSidebar() {
    return this.appService.toggleSidebar();
  }
}
