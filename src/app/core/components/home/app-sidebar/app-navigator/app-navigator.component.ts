import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {AuthService} from '../../../../services/auth';

@Component({
  selector: 'app-navigator',
  styleUrls: ['./app-navigator.scss'],
  template: `
  <div *ngIf="!dropDown" class="list-group" [class.closed]="closed">
      <button class="list-group-item ux-maker"
        [routerLink]="[{ outlets: { home : iconLink } }]">
        <icon [name]="iconName"></icon>
        <span class="text">{{ iconLabel }}</span>
      </button>
  </div>

  <div *ngIf="dropDown" class="dropdown list-group" [class.closed]="closed">
    <button (click)="toddleDropdown()"
            class="list-group-item ux-maker dropdown"
            type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
      <icon [name]="iconName"></icon>
      <span class="text">{{ iconLabel }}</span>
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
  @Input() page = 'home';
  @Input() dropDown = false;
  @Input() closed = false;
  @Input() searchType = 'video';
  @Input() iconName: string;
  @Input() iconLabel: string;
  @Input() iconLink: string;
  @Input() outlet: string;
  toggleDropdown = false;
  // public searchType$ = this.store.select(PlayerSearch.getSearchType);

  constructor(
    // private store: Store<EchoesState>,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  toddleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
