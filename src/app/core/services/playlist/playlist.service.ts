import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as playlistStore from '../../store/playlist';
import {GameSocialState} from '../../store/reducers';
import * as _ from 'lodash';
import {getPlaylists, getSelectedPlaylistVideos, getSelectedVideo, getSelectedPlaylistId} from '../../store/playlist';

@Injectable()
export class PlaylistService {
  public playlists$ = this.store.select(getPlaylists);
  public selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  public slectedPlayist$ = this.store.select(getSelectedPlaylistVideos);
  public selectedVideo$;

  constructor(
    private store: Store<GameSocialState>,
  ) {}

  // queueVideo(mediaId: string) {
    // return this.microsoftService.api
    //   .list(mediaId)
    //   .pipe(map(items => items[0]));
  // }

  queueVideos(medias: any[]) {
    this.store.dispatch(new playlistStore.AddVideos(medias));
  }

  removeVideo(video: any, playlistId: any) {
    this.store.dispatch(new playlistStore.RemoveVideo(video, playlistId));
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
    return this.selectedVideo$;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(new playlistStore.UpdatePlaylistIndex(mediaId));
  }

  // isInLastTrack(): boolean {
  //   let playlist: playlistStore.IPlaylistStore;
  //   this.playlist$
  //     .pipe(take(1))
  //     .subscribe(p => (playlist = p));
  //   const currentVideoId = playlist.selectedId;
  //   const indexOfCurrentVideo = playlist.videos.findIndex(
  //     video => video.id === currentVideoId
  //   );
  //   const isCurrentLast = indexOfCurrentVideo + 1 === playlist.videos.length;
  //   return isCurrentLast;
  // }

  seekToTrack(trackEvent) {
    this.store.dispatch(new playlistStore.SeekTo(trackEvent));
  }

  sortPlaylist(playlist) {
    this.store.dispatch(new playlistStore.SortPlaylist(playlist));
  }
}
