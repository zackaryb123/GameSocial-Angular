import * as playerStore from '../../store/player';
import * as playlistStore from '../../store/playlist/playlist.selectors';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Output
} from '@angular/core';
import {GameSocialState} from '../../store/reducers';
import {PlaylistEffects} from '../../effects/playlist.effects';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {PlayerService} from '../../services/player/player.service';

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
    <div class="yt-player ux-maker">
      <player-resizer
        (toggle)="togglePlayer()"
        [fullScreen]="player.isShowPlayer"
      ></player-resizer>
<!--      <youtube-player-->
<!--        (ready)="setupPlayer($event)"-->
<!--        (change)="updatePlayerState($event)"-->
<!--      ></youtube-player>-->
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
  isPlayerInRepeat$ = this.store.select(playlistStore.isPlayerInRepeat);
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
    this.nowPlaylistEffects.loadNextTrack$.subscribe(action =>
      this.playVideo(action.payload)
    );
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
