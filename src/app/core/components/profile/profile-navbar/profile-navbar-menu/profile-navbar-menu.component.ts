import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import {expandFadeInAnimation} from '../../../../../shared/animations/fade-in.animation';
import {ActivatedRoute, Router} from '@angular/router';
import {PresenceService} from '../../../../services/presence/presence.service';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Escape = 27,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  ArrowDown = 40
}
@Component({
  selector: 'profile-navbar-menu',
  animations: [expandFadeInAnimation],
  template: `
    <app-notification [positionStyle]="notificationStyle"></app-notification>
    <button class="btn btn-navbar btn-transparent ux-maker btn-toggle"
      (click)="toggleMenu()">
      <icon name="ellipsis-v"></icon>
<!--      <icon name="dot-circle-o" class="pulse update-indicator text-primary"></icon>-->
    </button>
    <div class="menu-backdrop" *ngIf="!hide" (click)="hideMenu()"></div>
    <div class="panel menu-dropdown"
      [class.end-animation]="end"
      [@expandFadeIn]="menuState"
      (@expandFadeIn.done)="endAnimation($event)"
      >
      <div class="list-group">
        <a class="list-group-item navbar-action-link"
        [routerLink]="['/home']">
          <icon name="user"></icon> Home
        </a>
        <button class="list-group-item"
          (click)="handleSignOut()">
          <icon name="sign-out"></icon> Sign Out
        </button>

      </div>
    </div>
  `,
  styleUrls: ['./profile-navbar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileNavbarMenuComponent implements OnInit {
  end = false;
  hide = true;
  get menuState() {
    return this.hide ? 'hide' : 'show';
  }
  notificationStyle = {
    top: '-2px',
    left: '22px'
  };
  @Input() signedIn = false;
  @Input()
  appVersion = {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  };
  @Input() theme = { themes: [], selected: '' };
  @Output() signOut = new EventEmitter();
  @Output() versionUpdate = new EventEmitter();
  @Output() versionCheck = new EventEmitter();
  @Output() themeChange = new EventEmitter();

  @HostListener('keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private presenceService: PresenceService
  ) {}

  ngOnInit() { }

  hideMenu() {
    this.hide = true;
  }

  toggleMenu() {
    this.end = false;
    this.hide = !this.hide;
  }

  handleVersionUpdate() {
    this.versionUpdate.emit();
  }

  handleVersionCheck() {
    this.versionCheck.emit();
  }

  updateTheme(theme) {
    this.themeChange.emit(theme);
  }

  endAnimation({ toState }) {
    if (toState === 'hide') {
      this.end = true;
    }
  }

  handleSignOut() {
    return this.presenceService.signOut();
  }
}

