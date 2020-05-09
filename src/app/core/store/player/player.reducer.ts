import {IPlayerAction, PlayerActionTypes} from './player.actions';

export * from './player.actions';

export interface IPlayerStore {
  index: number;
  media?: any;
  showPlayer: boolean;
  playerState: number;
  fullscreen: {
    on: boolean;
    height: number;
    width: number;
  };
  isFullscreen: boolean;
}
const initialPlayerState: IPlayerStore = {
  index: 0,
  media: {
    snippet: { title: 'No Media Yet', thumbnails: { default: { url: '' } } }
  },
  showPlayer: true,
  playerState: 0,
  fullscreen: {
    on: false,
    height: 270,
    width: 367
  },
  isFullscreen: false
};
export function playerStore(
  state: IPlayerStore = initialPlayerState,
  action: IPlayerAction
): IPlayerStore {
  switch (action.type) {
    case PlayerActionTypes.PLAY:
      return playVideo(state, action.payload);

    case PlayerActionTypes.QUEUE:
      return state;

    case PlayerActionTypes.TOGGLE_PLAYER:
      return toggleVisibility(state);

    case PlayerActionTypes.UPDATE_STATE:
      return changePlayerState(state, action.payload);

    case PlayerActionTypes.FULLSCREEN: {
      const on = !state.fullscreen.on;
      let { height, width } = initialPlayerState.fullscreen;
      if (on) {
        height = window.innerHeight;
        width = window.innerWidth;
      }
      const fullscreen = { on, height, width };
      return { ...state, fullscreen };
    }

    case PlayerActionTypes.RESET:
      return {
        ...state,
        isFullscreen: false,
        playerState: 0
      };

    case PlayerActionTypes.RESET_FULLSCREEN: {
      const fullscreen = initialPlayerState.fullscreen;
      return { ...initialPlayerState, ...state, fullscreen };
    }

    default:
      return { ...initialPlayerState, ...state };
  }
}

export function playVideo(state: IPlayerStore, media: any) {
  return { ...state, mediaId: media.id || '', media };
}

export function toggleVisibility(state: IPlayerStore) {
  return { ...state, showPlayer: !state.showPlayer };
}

export function changePlayerState(
  state: IPlayerStore,
  playerState: any
) {
  return { ...state, playerState };
}
