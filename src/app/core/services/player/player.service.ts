import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as appPlayerStore from '../../store/player';
import * as playlistStore from '../../store/playlist';
import { take, map } from 'rxjs/operators';
import {toPayload} from '../../../shared/utils/data.utils';
import {PlaylistEffects} from '../../effects/playlist.effects';
import {GameSocialState} from '../../store/reducers';

@Injectable()
export class PlayerService {
  constructor(
    private store: Store<GameSocialState>,
    private nowPlaylistEffects: PlaylistEffects
  ) {}

  playPlaylist(playlist: any) {
    this.nowPlaylistEffects.playPlaylistFirstTrack$
      .pipe(map(toPayload), take(1))
      .subscribe((media: any) =>
        this.playVideo(media)
      );
    this.queuePlaylist(playlist);
  }

  queuePlaylist(playlist: any) {
    this.store.dispatch(new playlistStore.LoadPlaylistAction(playlist.id));
  }

  playVideo(video: any) {
    this.store.dispatch(new appPlayerStore.LoadAndPlay(video));
    this.store.dispatch(new playlistStore.SelectVideo(video));
  }

  addVideo(video: any, playlistId: any) {
    this.store.dispatch(new playlistStore.AddVideo(video, playlistId));
  }

  removeVideoFromPlaylist(video: any, playlistId: any) {
    this.store.dispatch(new playlistStore.RemoveVideo(video, playlistId));
  }

  pauseVideo() {
    this.store.dispatch(new appPlayerStore.PauseVideo());
  }

  togglePlayer() {
    this.store.dispatch(new appPlayerStore.TogglePlayer(true));
  }

  toggleFullScreen() {
    this.store.dispatch(new appPlayerStore.FullScreen());
  }

  toggleRepeat() {
    this.store.dispatch(new playlistStore.ToggleRepeat());
  }

  resetPlayer() {
    this.store.dispatch(new appPlayerStore.Reset());
  }

  setupPlayer(player) {
    this.store.dispatch(new appPlayerStore.SetupPlayer(player));
  }

  changePlayerState(event: any) {
    this.store.dispatch(new appPlayerStore.PlayerStateChange(event.data));
    this.store.dispatch(new playlistStore.PlayerStateChange(event.data));
  }
}
