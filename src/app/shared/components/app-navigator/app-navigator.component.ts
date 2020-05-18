import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {IconInterface} from '../../../core/interfaces/common.interface';
import {AuthService} from '../../../core/services/auth';

@Component({
  selector: 'app-navigator',
  styleUrls: ['./app-navigator.scss'],
  template: `
  <div *ngIf="!dropDown" class="list-group" [class.closed]="closed">
    <button class="list-group-item ux-maker"
      *ngFor="let route of routes;"
      [routerLink]="[{outlets: {profile: this.iconLink}}]">
      <icon [name]="route.icon"></icon>
      <span class="text">{{ route.label }}</span>
    </button>
  </div>

  <div *ngIf="dropDown" class="dropdown list-group" [class.closed]="closed">
    <button *ngFor="let route of routes;"
            (click)="toddleDropdown()"
            class="list-group-item ux-maker dropdown"
            type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
      <icon [name]="route.icon"></icon>
      <span class="text">{{ route.label }}</span>
    </button>
    <div [style.display]="toggleDropdown ? 'block' : 'none'" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Playlist One</a>
      <a class="dropdown-item" href="#">Playlist Two</a>
      <a class="dropdown-item" href="#">Playlist Three</a>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() page: string;
  @Input() dropDown: boolean = false;
  @Input() closed = false;
  @Input() searchType = 'video';
  @Input() iconName: string;
  @Input() iconLabel: string;
  @Input() iconLink: string;
  toggleDropdown = false;
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

  toddleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
