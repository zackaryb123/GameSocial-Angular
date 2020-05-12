import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';
import {IconInterface} from '../../../interfaces/common.interface';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navigator',
  styleUrls: ['./app-navigator.scss'],
  template: `
  <div class="list-group"
    [class.closed]="closed">
    <button class="list-group-item ux-maker"
      *ngFor="let route of routes;"
      (click)="click(go(route.link))">
      <icon [name]="route.icon"></icon>
      <span class="text">{{ route.label }}</span>
    </button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() closed = false;
  @Input() searchType = 'video';
  @Input() iconName: string;
  @Input() iconLabel: string;
  @Input() iconLink: string;

  // public searchType$ = this.store.select(PlayerSearch.getSearchType);
  public routes: IconInterface[] = [
    { link: 'search', icon: this.iconName, label: this.iconLabel }
  ];

  constructor(
    // private store: Store<EchoesState>,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routes[0].icon = this.iconName;
    this.routes[0].label = this.iconLabel;
  }

  click(booleanPromise: Promise<boolean>) {
    if (this.iconLabel === 'Explore') {
      this.go(this.iconLink);
    } else if (this.iconLabel === 'Logout') {
      this.logout();
    }
  }

  go(link: string) {
    // this.router.navigate([`/${link}`], { queryParams: { filter: '' } });
    return this.router.navigate([{outlets: {home: `home/${link}`}}]);
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        console.log('res: ', res);
        return this.router.navigate(['/']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }

}
