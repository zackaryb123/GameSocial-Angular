import { Store, createSelector } from '@ngrx/store';
import { IPlaylistStore } from './playlist.reducer';
import {GameSocialState} from '../reducers';

export const getPlaylistStore = (state: GameSocialState) => state.playlistStore;
export const isPlayerInRepeat = createSelector(
  getPlaylistStore,
  (nowPlaylist: IPlaylistStore) => nowPlaylist.repeat
);
export const getPlaylistVideos = createSelector(
  getPlaylistStore,
  (nowPlaylist: IPlaylistStore) => nowPlaylist.videos
);
export const getPlaylistMediaIds = createSelector(
  getPlaylistVideos,
  (playlist: any[]) => playlist.map(media => media.id)
);
export const getSelectedMediaId = createSelector(
  getPlaylistStore,
  (nowPlaylist: IPlaylistStore) => nowPlaylist.selectedId
);
export const getSelectedMedia = createSelector(
  getPlaylistStore,
  getSelectedMediaId,
  (nowPlaylist: IPlaylistStore, selectedId: string) => {
    const mediaIds = nowPlaylist.videos.map(video => video.id);
    const selectedMediaIndex = mediaIds.indexOf(selectedId);
    return nowPlaylist.videos[selectedMediaIndex];
  }
);
