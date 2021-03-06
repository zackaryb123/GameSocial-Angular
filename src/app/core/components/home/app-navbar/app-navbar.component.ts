import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app-navbar.scss'],
  template: `
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="navbar-container">
        <ul class="nav abs-pos">
          <li class="nav-item">
            <a class="nav-link active" (click)="go('xbox')">Xbox</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" (click)="go('playstation')">Playstation</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" (click)="go('nintendo')">Nintendo</a>
          </li>
        </ul>
        <div class="navbar__content">
        <h3 *ngIf="header" class="navbar__header navbar-text">
            <button *ngIf="mainIcon" class="navbar-btn__main btn-transparent"
              (click)="handleMainIconClick()">
              <icon [name]="mainIcon"></icon>
            </button>
            <icon [name]="headerIcon" *ngIf="headerIcon"></icon> {{ header }}
          </h3>
          <ng-content></ng-content>
        </div>
        <section class="navbar-text navbar-actions">
          <app-navbar-menu
            [appVersion]="appVersion$"
            [theme]="themes$"
            (themeChange)="changeTheme($event)"
            (signOut)="signOutUser()"
            (versionUpdate)="updateVersion()"
            (versionCheck)="checkVersion()"
          ></app-navbar-menu>
        </section>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {
  user$ = '';
  appVersion$ =  {
    isNewAvailable: false,
    semver: '',
    checkingForVersion: false
  };
  themes$ = {
    themes: [''],
    selected: ''
  };

  @Input() header: string;
  @Input() headerIcon = '';
  @Input() mainIcon = '';

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() headerMainIconClick = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  go(link) {
    return this.router.navigateByUrl(`/home/(explore:${link})`);
  }

  signInUser() {
    // this.appApi.signinUser();
    // this.signIn.next();
  }

  signOutUser() {
    // this.appApi.signoutUser();
    // this.signOut.next();
  }

  isSignIn() {
    // return this.authorization.isSignIn();
  }

  updateVersion() {
    // this.appApi.updateVersion();
  }

  checkVersion() {
    // this.appApi.checkVersion();
  }

  handleMainIconClick() {
    // this.headerMainIconClick.emit();
  }

  changeTheme(theme) {
    // this.appApi.changeTheme(theme.value);
  }
}
