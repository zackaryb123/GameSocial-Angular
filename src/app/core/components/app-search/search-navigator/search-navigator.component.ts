import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

interface TSearchType {
  label: string;
  link: string;
  params: { filter: string };
  type: string;
}

@Component({
  selector: 'search-navigator',
  styleUrls: ['./search-navigator.component.scss'],
  template: `
    <ul class="nav nav-tabs search-selector" role="tablist">
      <li *ngFor="let search of searchTypes" [ngClass]="{ 'active': isActive(search)}">
        <a class="search-filter"
           [routerLink]="[{ outlets: { home: search.link } }]"
           [queryParams]="search.params"
        >{{ search.label }}</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchNavigatorComponent implements OnInit {
  searchTypes: TSearchType[] = [
    {
      label: 'Videos',
      link: `videos`,
      params: { filter: '' },
      type: 'video'
    },
    {
      label: 'Playlists',
      link: 'playlist',
      params: { filter: '' },
      type: 'playlist'
    },
    {
      label: 'Albums',
      link: `albums`,
      params: { filter: '' },
      type: 'video'
    }
  ];
  @Input() queryParams: string;
  @Input() searchType = 'video';
  @Output() navigated = new EventEmitter<INavigateEvent>();

  ngOnInit() { }

  handleRouteClick(searchType: {
    label: string;
    link: string;
    type: string;
  }) {
    // this.navigated.emit(searchType);
  }

  isActive({ type, params }: TSearchType) {
    const { queryParams , searchType } = this;
    const currentPreset = '';
    return type === searchType && params.filter === currentPreset;
  }

}

export interface INavigateEvent {
  params: {
    filter: string;
  };
  type: string;
}
