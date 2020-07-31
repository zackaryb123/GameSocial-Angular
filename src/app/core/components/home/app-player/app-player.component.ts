import * as playerStore from '../../../store/player';
import * as playlistStore from '../../../store/playlist/playlist.selectors';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Output
} from '@angular/core';
import {GameSocialState} from '../../../store/reducers';
import {PlaylistEffects} from '../../../effects/playlist.effects';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {PlayerService} from '../../../services/player/player.service';

@Component({
  selector: 'app-player',
  styleUrls: ['./app-player.scss'],
  template: `
  <section *ngIf="{
    isFullScreen: isPlayerFullscreen$ | async,
    isShowPlayer: isShowPlayer$ | async
  } as player"
    [class.show-youtube-player]="player.isShowPlayer"
    [class.fullscreen]="player.isFullScreen.on">
    <div class="player ux-maker">
      <player-resizer
        (toggle)="togglePlayer()"
        [fullScreen]="player.isShowPlayer"
      ></player-resizer>

      <iframe id="7sp6dyg" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="GameClip video player" width="367" height="270" src=""></iframe>
<!--      <iframe id="7sp6dyg" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="1122" height="1017" src="https://www.youtube.com/embed/?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;widgetid=1"></iframe>-->

    </div>
    <div class="container" *ngIf="media$ | async as media">
      <image-blur [media]="media" *ngIf="!player.isFullScreen.on"></image-blur>
      <media-info
        [player]="player$ | async"
        [minimized]="media"
        [floating]="player.isFullScreen.on"
        (thumbClick)="toggleFullScreen()"
        (seekTrack)="selectTrackInVideo($event)"
      ></media-info>
      <player-controls class="controls-container nicer-ux"
        [isRepeat]="isPlayerInRepeat$ | async"
        [playing]="isPlayerPlaying$ | async"
        [media]="media"
        (pause)="pauseVideo()"
        (next)="playNextTrack()"
        (play)="playVideo($event)"
        (previous)="playPreviousTrack()"
        (repeat)="toggleRepeat()"
      ></player-controls>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerComponent implements OnInit, OnDestroy {
  player$ = this.store.select(playerStore.getPlayerStore);
  media$ = this.store.select(playerStore.getCurrentMedia);
  isPlayerPlaying$ = this.store.select(playerStore.getIsPlayerPlaying);
  isPlayerInRepeat$ = false;
  // this.store.select(playlistStore.isPlayerInRepeat);
  isPlayerFullscreen$ = this.store.select(playerStore.getPlayerFullscreen);
  isShowPlayer$ = this.store.select(playerStore.getShowPlayer);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private playlistService: PlaylistService,
    private store: Store<GameSocialState>,
    private nowPlaylistEffects: PlaylistEffects,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.playerService.resetPlayer();
    // this.nowPlaylistEffects.loadNextTrack$.subscribe(action =>
    //   this.playVideo(action.payload)
    // );
  }

  ngOnDestroy() { }

  setupPlayer(player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState(event) {
    this.playerService.changePlayerState(event);
  }

  playVideo(media: any) {
    this.playerService.playVideo(media);
  }

  pauseVideo() {
    this.playerService.pauseVideo();
  }

  togglePlayer() {
    this.playerService.togglePlayer();
  }

  toggleFullScreen() {
    this.playerService.toggleFullScreen();
  }

  playNextTrack() {
    this.playlistService.selectNextIndex();
    this.playVideo(this.playlistService.getCurrent());
  }

  playPreviousTrack() {
    this.playlistService.selectPreviousIndex();
    this.playVideo(this.playlistService.getCurrent());
  }

  toggleRepeat() {
    this.playerService.toggleRepeat();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: any;
  }) {
    this.playVideo(trackEvent.media);
    this.playlistService.seekToTrack(trackEvent);
  }
}
