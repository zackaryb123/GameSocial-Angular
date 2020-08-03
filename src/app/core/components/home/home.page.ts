import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';
import { Router} from '@angular/router';
import {FirebaseUserModel} from '../../models/user.model';
import {AppService} from '../../services/app/app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  user: FirebaseUserModel = new FirebaseUserModel();
  auth: any;
  query$ = '';
  searchType$ = 'video';
  currentPlaylist$ = false;
  queryParams$ = {duration: false, hd: false };
  presets$ = '';

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.getAuth().then(data => {{
      this.auth = data;
    }});
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

