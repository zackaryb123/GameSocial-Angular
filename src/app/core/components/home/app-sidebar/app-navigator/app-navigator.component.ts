import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';
import {PlaylistService} from '../../../../services/playlist/playlist.service';

@Component({
  selector: 'app-navigator',
  styleUrls: ['./app-navigator.scss'],
  template: `
  <div *ngIf="!dropDown" class="list-group" [class.closed]="closed">
      <button class="list-group-item ux-maker"
              (click)="go()">
        <icon [name]="iconName"></icon>
        <span class="text">{{ iconLabel }}</span>
      </button>
  </div>

  <div *ngIf="dropDown" class="dropdown list-group" [class.closed]="closed">
    <button (click)="toddleDropdown()"
            class="btn list-group-item ux-maker dropdown"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
      <icon [name]="iconName"></icon>
      <span class="text ml-3">{{ iconLabel }}</span>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a *ngFor="let playlist of dropDownList" (click)="getNewList(playlist.id)" class="dropdown-item" style="cursor: pointer">
        <span>{{playlist.name}}</span>
      </a>
      <div class="input-group mb-3 dropdown-item">
        <input type="text" class="form-control" placeholder="Add Playlist" aria-label="Add Playlist" aria-describedby="basic-addon2"
          [(ngModel)]="newListItem"
          (keydown.enter)="addListItem()">
        <div class="input-group-append">
          <button (click)="addListItem()" class="btn btn-outline-secondary" type="button">Add</button>
        </div>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() auth: any;
  @Input() dropDownList: any;
  @Input() page = 'home';
  @Input() dropDown = false;
  @Input() closed = false;
  @Input() searchType = 'video';
  @Input() iconName: string;
  @Input() iconLabel: string;
  @Input() iconLink: string;
  @Input() outlet: string;
  newListItem: string;
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

  go() {
    return this.router.navigateByUrl(`/home/(${this.iconLink}:clips)`);
  }

  getNewList(id) {
    this.selectNewPlaylist.emit(id);
  }

  toddleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }

  addListItem() {
    switch (this.page) {
      case 'home':
        return this.playlistService.addPlaylist(this.auth.uid, this.newListItem);
    }
    this.newListItem = '';
  }
}
