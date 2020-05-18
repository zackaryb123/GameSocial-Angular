import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

// import { Authorization } from '@core/services';
// import { EchoesState } from '@core/store';
// import { AppApi } from '@dispatcher/app.dispatcher';

@Component({
  selector: 'profile-navbar',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile-navbar.scss'],
  template: `
    <nav class="row navbar navbar-default navbar-fixed-top">
      <div class="navbar-container">
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
          <profile-navbar-menu
            [appVersion]="appVersion$"
            [theme]="themes$"
            (themeChange)="changeTheme($event)"
            (signOut)="signOutUser()"
            (versionUpdate)="updateVersion()"
            (versionCheck)="checkVersion()"
          ></profile-navbar-menu>
        </section>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileNavbarComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

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
