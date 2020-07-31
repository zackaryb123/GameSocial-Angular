import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app/app.service';

const MODAL_ANIMATION_TIMEOUT = 50;
@Component({
  selector: 'app-video-modal',
  styleUrls: ['./app-video.modal.scss'],
  template: `
  <div *ngIf="{show: show$ | async, media: media$ | async  } as video">
    <div class="backdrop is-fixed" *ngIf="video.show"></div>
    <div [ngClass]="{ 'add-to-playlist': true, 'show-modal': animateShow }" *ngIf="video.show && video.media.id">
      <img class="is-absolute thumb-image thumb-shadow"
        [src]="video.media.snippet.thumbnails.high.url" >
      <div class="header is-sticky">
        <h4 class="text-success">Add To Playlist: {{video.media.snippet.title}}</h4>
          <button-icon class="is-absolute" icon="times" (click)="closeModal()" types="btn btn-danger"></button-icon>
      </div>
      <section class="is-flex-row content">
        <div class="media-to-add is-flex-column is-sticky">
          <video-media-options
            [media]="video.media">
          </video-media-options>
        </div>
        <div class="playlists is-strechable" *ngIf="playlists$ | async as playlists">
          <input [value]="playlistsFilter" placeholder="filter playlists..." class="form-control" #searchFilter (input)
          ="handleFilterChange(searchFilter.value)" type="search">
          <section class="is-flex-row is-flex-wrap">
            <button class="btn btn-transparent playlist"
            *ngFor="let playlist of playlists | search:playlistsFilter"
            title="Click to add the video to this playlist" >
<!--              <youtube-playlist [media]="playlist" [playIcon]="'check 2x'" [noNavigate]="true" (play)="addToPlaylist(playlist, video.media)" (navigated)="closeModal()"></youtube-playlist>-->
            </button>
          </section>
        </div>
      </section>
    </div>
</div>
  `
})
export class AppVideoModalComponent implements OnInit {
  // showModal$ = this.appDispatcher.showAddToPlaylist$;
  // playlists$ = this.appDispatcher.usersPlaylists$;
  // media$ = this.appDispatcher.mediaToPlaylist$;

  playlistsFilter = '';
  animateShow = false;

  constructor(private appService: AppService) {
    // this.showModal$.subscribe(show => {
    //   if (show) {
    //     setTimeout(() => this.animateShow = true, MODAL_ANIMATION_TIMEOUT);
    //   }
    // });
  }
  ngOnInit() {

  }

  closeModal() {
    this.animateShow = false;
    setTimeout(() => {
      this.appService.toggleModal(false);
    }, MODAL_ANIMATION_TIMEOUT * 13);
  }

  handleFilterChange(filter: string) {
    this.playlistsFilter = filter;
  }

  addToPlaylist(playlist: any, media: any) {
    // this.appDispatcher.addToPlaylist(playlist, media);
  }
}
