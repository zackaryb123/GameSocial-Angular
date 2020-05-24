import { createSelector } from '@ngrx/store';
import {IPlaylistStore} from './playlist.reducer';
import {GameSocialState} from '../reducers';

export const getPlaylistStore = (state: GameSocialState) => state.playlistStore;

// export const isPlayerInRepeat = createSelector(
//   getPlaylistStore,
//   (playlist: IPlaylistStore) => playlist.repeat
// );

export const getPlaylists = createSelector(
  getPlaylistStore,
  (playlistStore: IPlaylistStore) => playlistStore.playlists
);

export const getSelectedPlaylistId = createSelector(
  getPlaylistStore,
  (playlistStore: IPlaylistStore) => playlistStore.selectedPlaylistId
);

export const getSelectedPlaylistVideos = createSelector(
  getPlaylistStore,
  (playlistStore: IPlaylistStore) => playlistStore.playlists[playlistStore.selectedPlaylistId]
);

// export const getPlaylistMediaIds = createSelector(
//   getSelectedPlaylistVideos,
//   (playlist: any[]) => playlist.map(media => media.id)
// );

export const getSelectedVideoId = createSelector(
  getPlaylistStore,
  (playlistStore: IPlaylistStore) => playlistStore.playlists[playlistStore.selectedPlaylistId]
    .videos[playlistStore[playlistStore.selectedPlaylistId].selectedVideoId].id
);

export const getSelectedVideo = createSelector(
  getPlaylistStore,
  (playlistStore: IPlaylistStore) => {
    if (playlistStore.playlists) {
      return playlistStore.playlists[playlistStore.selectedPlaylistId]
        .videos[playlistStore.playlists[playlistStore.selectedPlaylistId].selectedVideoId];
    }
  }
);
