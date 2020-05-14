import {ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app/app.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;

  constructor(
    private appService: AppService,
  ) {}
  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
