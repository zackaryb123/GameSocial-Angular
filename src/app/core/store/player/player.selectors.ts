import { Store, createSelector } from '@ngrx/store';
import { IPlayerStore } from './player.reducer';
import {GameSocialState} from '../reducers';

export const getPlayerStore = (state: GameSocialState) => state.playerStore;

export const getCurrentMedia = createSelector(
  getPlayerStore,
  (player: IPlayerStore) => player.media
);

export const getIsPlayerPlaying = createSelector(
  getPlayerStore,
  (player: IPlayerStore) => player.playerState === 1
);

export const getShowPlayer = createSelector(
  getPlayerStore,
  (player: IPlayerStore) => player.showPlayer
);

export const getPlayerFullscreen = createSelector(
  getPlayerStore,
  (player: IPlayerStore) => player.fullscreen
);
