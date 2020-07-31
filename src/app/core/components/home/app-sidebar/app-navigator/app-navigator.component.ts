import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';
import {AuthService} from '../../../../services/auth';
import {PlaylistService} from "../../../../services/playlist/playlist.service";

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
      <span class="text ml-3">{{ iconLabel }}</span>
    </button>
    <div [style.display]="toggleDropdown ? 'block' : 'none'" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a *ngFor="let playlist of dropDownList" (click)="getNewList(playlist.id)" class="dropdown-item" style="cursor: pointer">
        <span>{{playlist.name}}</span>
      </a>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() dropDownList: any;
  @Input() page = 'home';
  @Input() dropDown = false;
  @Input() closed = false;
  @Input() searchType = 'video';
  @Input() iconName: string;
  @Input() iconLabel: string;
  @Input() iconLink: string;
  @Input() outlet: string;

  toggleDropdown = false;

  @Output() selectNewPlaylist = new EventEmitter<string>();
  // public searchType$ = this.store.select(PlayerSearch.getSearchType);

  constructor(
    private router: Router,
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {
  }

  getNewList(id) {
    this.selectNewPlaylist.emit(id);
  }

  toddleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
