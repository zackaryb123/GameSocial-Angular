import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import {GameClipNode} from '../../../interfaces/xbox.interfaces';
import {XboxService} from '../../../services/3rd-party/microsoft/xbox.service';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-videos',
  styleUrls: ['./app-videos.scss'],
  template: `
<!--    <loader [message]="'Loading Awesome Media Results'" [loading]="loading$"></loader>-->
    <separator
    [title]="station">
    </separator>
    <video-list2
      [authUser]="authUser"
      [page]=""
      [list]="videos$"
      [queued]="playlistIds$"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
      (add)="addMediaToPlaylist($event)"
    ></video-list2>
  `
})
export class AppVideosComponent implements OnInit {
  @Input() authUser: any;
  // videos$: any;
  station: any;
  videos$: GameClipNode[];
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  continuationToken$: any;
  // this.store.select(fromPlayerSearch.getPlayerSearchResults);
  playlistIds$ = ''; // this.store.select(NowPlaylist.getPlaylistMediaIds);
  loading$ = false; // this.store.select(fromPlayerSearch.getIsSearching);

  constructor(
    private appService: AppService,
    private xboxService: XboxService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(routeParams => {
        if (routeParams) {
          console.log('ROUTE PARAMS: ', routeParams);
          this.station = routeParams.station;
        }
      });
    // this.videos$ = TEST_VIDEOS;
    // console.log('thumbnails: ', this.videos$[0].thumbnails);
    // const thumbnails = this.videos$[0].thumbnails.map(item => item.uri);
    // console.log(thumbnails.toString())

    // extractThumbnailSrcSet(this.videos$[0]);
    // this.store.dispatch(
      // new fromPlayerSearch.UpdateSearchType(fromPlayerSearch.CSearchTypes.VIDEO)
    // );
    // this.store.dispatch(new fromPlayerSearch.SearchCurrentQuery());
  }

  playSelectedVideo(media: any) {
    // this.appPlayerApi.playVideo(media);
  }

  queueSelectedVideo(media: any) {
    // this.appPlayerApi.queueVideo(media);
  }

  removeVideoFromPlaylist(media: any) {
    // this.appPlayerApi.removeVideoFromPlaylist(media);
  }

  addMediaToPlaylist(media: any) {
    this.appService.toggleModal(true, media);
  }

}
