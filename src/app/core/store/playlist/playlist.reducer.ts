import {IPlaylistAction, PlaylistActionTypes} from './playlist.actions';

export interface IPlaylistStore {
  videos: any[];
  selectedId: string;
  filter: string;
  repeat: boolean;
}

const initialState: IPlaylistStore = {
  videos: [],
  selectedId: '',
  filter: '',
  repeat: false
};

export function playlistStore(
  state: IPlaylistStore = initialState,
  action: IPlaylistAction
): IPlaylistStore {
  switch (action.type) {
    case PlaylistActionTypes.SELECT:
      return { ...state, selectedId: action.payload.id };

    case PlaylistActionTypes.QUEUE:
      return { ...state, videos: addMedia(state.videos, action.payload) };

    case PlaylistActionTypes.QUEUE_VIDEOS:
      return { ...state, videos: addMedias(state.videos, action.payload) };

    case PlaylistActionTypes.REMOVE:
      return { ...state, videos: removeMedia(state.videos, action.payload) };

    // updates index by media
    case PlaylistActionTypes.UPDATE_INDEX:
      return { ...state, selectedId: action.payload };

    case PlaylistActionTypes.FILTER_CHANGE:
      return { ...state, filter: action.payload };

    case PlaylistActionTypes.REMOVE_ALL:
      return { ...state, videos: [], filter: '', selectedId: '' };

    case PlaylistActionTypes.SELECT_NEXT: {
      return {
        ...state,
        selectedId: selectNextIndex(
          state.videos,
          state.selectedId,
          state.filter,
          state.repeat
        )
      };
    }

    case PlaylistActionTypes.SELECT_PREVIOUS:
      return {
        ...state,
        selectedId: selectPreviousIndex(
          state.videos,
          state.selectedId,
          state.filter
        )
      };

    case PlaylistActionTypes.MEDIA_ENDED:
      return selectNextOrPreviousTrack(state, state.filter);

    case PlaylistActionTypes.TOGGLE_REPEAT: {
      return {
        ...state,
        repeat: !state.repeat
      };
    }

    case PlaylistActionTypes.LOAD_PLAYLIST_END: {
      return {
        ...state
      };
    }

    case PlaylistActionTypes.SORT_PLAYLIST: {
      return {
        ...state,
        videos: action.payload
      };
    }

    default:
      return state;
  }
}

function addMedia(videos: any[], media: any) {
  const newMedia = videos.findIndex(video => video.id === media.id);
  const newMedias = [];
  if (newMedia === -1) {
    newMedias.push(media);
  }
  return [...videos, ...newMedias];
}

function addMedias(videos, medias) {
  const allVideoIds = videos.map(video => video.id);
  const newVideos = medias.filter(media => !allVideoIds.includes(media.id));
  return [...videos, ...newVideos];
}

function filterVideos(videos: any[], filter: string) {
  const sanitizedFilter = filter.toLowerCase();
  return videos.filter(video =>
    JSON.stringify(video)
      .toLowerCase()
      .includes(sanitizedFilter)
  );
}

function getSelectedInFilteredVideos(
  videos: any[],
  filter: string,
  selectedId: string
) {
  const filteredVideos = filterVideos(videos, filter);
  const currentIndex: number = filteredVideos.findIndex(
    video => video.id === selectedId
  );
  return {
    filteredVideos,
    currentIndex
  };
}

function selectNextIndex(
  videos: any[],
  selectedId: string,
  filter: string,
  isRepeat: boolean
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  let nextIndex = currentIndex + 1;
  if (!filteredVideos.length) {
    nextIndex = 0;
  }
  if (filteredVideos.length === nextIndex) {
    nextIndex = isRepeat ? 0 : currentIndex;
  }

  return filteredVideos[nextIndex].id || '';
}

function selectPreviousIndex(
  videos: any[],
  selectedId: string,
  filter: string
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  let previousIndex = currentIndex - 1;
  if (!filteredVideos.length || previousIndex < 0) {
    previousIndex = 0;
  }

  return filteredVideos[previousIndex].id || '';
}

function selectNextOrPreviousTrack(
  state: IPlaylistStore,
  filter: string
): IPlaylistStore {
  const { videos, selectedId, repeat } = state;
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  const isCurrentLast = currentIndex + 1 === filteredVideos.length;
  const nextId = isCurrentLast
    ? getNextIdForPlaylist(filteredVideos, repeat, selectedId)
    : selectNextIndex(filteredVideos, selectedId, filter, repeat);
  return {
    ...state,
    selectedId: nextId
  };
}

function getNextIdForPlaylist(
  videos: any[],
  repeat: boolean,
  currentId: string = ''
) {
  let id = '';
  if (videos.length && repeat) {
    id = videos[0].id;
  }
  return id;
}

function removeMedia(
  videos: any[],
  media: any
): any[] {
  return videos.filter(
    (m: any) => m.id !== media.id
  );
}
