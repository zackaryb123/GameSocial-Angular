import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as playlistStore from '../../store/playlist';
import { map, take } from 'rxjs/operators';
import {GameSocialState} from '../../store/reducers';
import {MicrosoftService} from '../3rd-party/microsoft/microsoft.service';

@Injectable()
export class PlaylistService {
  public playlist$: Observable<playlistStore.IPlaylistStore>;

  constructor(
    public store: Store<GameSocialState>,
    // private microsoftService: MicrosoftService
  ) {
    this.playlist$ = this.store.pipe(select(playlistStore.getPlaylistStore));
  }

  // queueVideo(mediaId: string) {
    // return this.microsoftService.api
    //   .list(mediaId)
    //   .pipe(map(items => items[0]));
  // }

  queueVideos(medias: any[]) {
    this.store.dispatch(new playlistStore.QueueVideos(medias));
  }

  removeVideo(media) {
    this.store.dispatch(new playlistStore.RemoveVideo(media));
  }

  selectVideo(media) {
    this.store.dispatch(new playlistStore.SelectVideo(media));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new playlistStore.FilterChange(filter));
  }

  clearPlaylist() {
    this.store.dispatch(new playlistStore.RemoveAll());
  }

  selectNextIndex() {
    this.store.dispatch(new playlistStore.SelectNext());
  }

  selectPreviousIndex() {
    this.store.dispatch(new playlistStore.SelectPrevious());
  }

  trackEnded() {
    this.store.dispatch(new playlistStore.MediaEnded());
  }

  getCurrent() {
    let media;
    this.playlist$.pipe(take(1)).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.selectedId);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(new playlistStore.UpdateIndexByMedia(mediaId));
  }

  isInLastTrack(): boolean {
    let playlist: playlistStore.IPlaylistStore;
    this.playlist$
      .pipe(take(1))
      .subscribe(p => (playlist = p));
    const currentVideoId = playlist.selectedId;
    const indexOfCurrentVideo = playlist.videos.findIndex(
      video => video.id === currentVideoId
    );
    const isCurrentLast = indexOfCurrentVideo + 1 === playlist.videos.length;
    return isCurrentLast;
  }

  seekToTrack(trackEvent) {
    this.store.dispatch(new playlistStore.SeekTo(trackEvent));
  }

  sortPlaylist(playlist) {
    this.store.dispatch(new playlistStore.SortPlaylist(playlist));
  }
}
