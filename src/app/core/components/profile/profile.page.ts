import {ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app/app.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  query$ = '';
  queryParams$ = {duration: false, hd: false };
  currentPlaylist$ = false;
  constructor(
    private appService: AppService,
  ) {}
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  search(query: string) {
    if (!query.hasOwnProperty('isTrusted')) {
      // this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
    }
  }

  resetPageToken(query: string) {
    // this.store.dispatch(this.playerSearchActions.resetPageToken());
    // this.store.dispatch(new fromPlayerSearch.UpdateQueryAction(query));
  }

  searchMore() {
    // this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
  }

  updateParams(queryParams: any) {
    // this.store.dispatch(new UpdateQueryFilter(queryParams));
  }
}
