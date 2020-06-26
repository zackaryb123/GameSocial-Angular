import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app/app.service';
import {AuthService} from '../../../../services/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';


@Component({
  selector: 'profile-sidebar-brand',
  styleUrls: ['./profile-sidebar-brand.scss'],
  templateUrl: './profile-sidebar-brand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSidebarBrandComponent implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  authUser$ = this.authService.authUser$;
  authUid: string;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.getAuth().then(auth => {
      this.authUid = auth.uid;
    });
  }

  handleToggleSidebar() {
    return this.appService.toggleSidebar();
  }

  profileRoute() {
    return this.router.navigateByUrl(`/profile/(user:${this.authUid})`);
  }
}
