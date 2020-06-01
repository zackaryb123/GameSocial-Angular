import {IPlaylistAction, PlaylistActionTypes} from './playlist.actions';
import {migrateReducerState} from '../store.utils';

export interface IPlaylistStore {
  playlist?: IPlaylist[];
  filter?: string;
  selectedPlaylistId?: any;
}

export interface IPlaylist  {
  videos?: any[];
  playlistId?: any;
  selectedVideoId?: any;
  filter?: string;
  repeat?: boolean;
}

// export class PlaylistModel {
//
//
// }

const newInitialState: IPlaylistStore = {
  playlist: [
    {
      videos: [
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
            }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        },
        {
          contentDetails: {
            duration: 'PT43M23S'
          },
          snippet: {
            title: 'Title',
            description: 'Description',
            thumbnails: {
              "default":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/NkwXpngWfSQ/maxresdefault.jpg","width":1280,"height":720}}
          }
        }
      ],
      playlistId: 0,
      selectedVideoId: 0,
      filter: '',
      repeat: false
    },
  ],
  filter: '',
  selectedPlaylistId: 0
};

const initialState: IPlaylistStore = migrateReducerState(
  'prevPlaylistStore',
  newInitialState,
  localStorage
);

export function playlistStore(
  state: IPlaylistStore = initialState,
  action: IPlaylistAction
): IPlaylistStore {
  switch (action.type) {
    case PlaylistActionTypes.SELECT:
      return { ...state, selectedPlaylistId: action.video.id };

    case PlaylistActionTypes.ADD:
      return { ...state, playlist: addVideo(state.playlist, action.video, action.playlistId) };

    // case PlaylistActionTypes.ADD_VIDEOS:
    //   return { ...state, videos: addMedias(state.videos, action.payload) };

    case PlaylistActionTypes.REMOVE:
      return { ...state, playlist: removeVideo(state.playlist, action.video, action.playlistId) };

    // updates index by media
    case PlaylistActionTypes.UPDATE_INDEX:
      return { ...state, selectedPlaylistId: action.playlistId };

    case PlaylistActionTypes.FILTER_CHANGE:
      return { ...state, filter: action.filter };

    case PlaylistActionTypes.REMOVE_ALL:
      return { ...state, playlist: removePlaylist(state.playlist, action.playlistId) };

    // case PlaylistActionTypes.SELECT_NEXT: {
    //   return {
    //     ...state,
    //     playilists: selectNextIndex(
    //       state.playlists[state.selectedPlaylistId].videos,
    //       state.playlists[state.selectedPlaylistId].selectedVideoId
    //     )
    //   };
    // }

    // case PlaylistActionTypes.SELECT_PREVIOUS:
    //   return {
    //     ...state,
    //     videos: selectPreviousIndex(
    //       state.videos,
    //       state.selectedId,
    //       state.filter
    //     )
    //   };

    // case PlaylistActionTypes.MEDIA_ENDED:
    //   return selectNextOrPreviousTrack(state, state.filter);

    // case PlaylistActionTypes.TOGGLE_REPEAT: {
    //   return {
    //     ...state,
    //     repeat: !state.repeat
    //   };
    // }

    case PlaylistActionTypes.LOAD_PLAYLIST_END: {
      return {
        ...state
      };
    }

    // case PlaylistActionTypes.SORT_PLAYLIST: {
    //   return {
    //     ...state,
    //     videos: action.payload
    //   };
    // }

    default:
      return state;
  }
}

function addVideo(playlists: any, playlistId: any, addedVideo: any) {
  const exist = playlists[playlistId].findIndex(video => video.id === addedVideo.id);
  const newMedias = [];
  if (exist === -1) {
    playlists[playlistId].videos.push(addedVideo);
  }
  return [...playlists, ...newMedias];
}

// function addMedias(videos, medias) {
//   const allVideoIds = videos.map(video => video.id);
//   const newVideos = medias.filter(media => !allVideoIds.includes(media.id));
//   return [...videos, ...newVideos];
// }

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

// function selectNextIndex(
//   videos: any[],
//   selectedId: string,
//   filter: string,
//   isRepeat: boolean
// ): string {
//   const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
//     videos,
//     filter,
//     selectedId
//   );
//   let nextIndex = currentIndex + 1;
//   if (!filteredVideos.length) {
//     nextIndex = 0;
//   }
//   if (filteredVideos.length === nextIndex) {
//     nextIndex = isRepeat ? 0 : currentIndex;
//   }
//
//   return filteredVideos[nextIndex].id || '';
// }

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

// function selectNextOrPreviousTrack(
//   state: IPlaylistStore,
//   filter: string
// ): IPlaylistStore {
//   const { videos, selectedId, repeat } = state;
//   const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
//     videos,
//     filter,
//     selectedId
//   );
//   const isCurrentLast = currentIndex + 1 === filteredVideos.length;
//   const nextId = isCurrentLast
//     ? getNextIdForPlaylist(filteredVideos, repeat, selectedId)
//     : selectNextIndex(filteredVideos, selectedId, filter, repeat);
//   return {
//     ...state,
//     selectedId: nextId
//   };
// }

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

function removeVideo(playlists: IPlaylist[], removedVideo: any, playlistId: any): any[] {
  return playlists[playlistId].videos.filter((v: any) => v.id !== removedVideo.id);
}

function removePlaylist(playlists: IPlaylist[], playlistId: any): any[] {
  return playlists.filter((p: any) => p.playlistId !== playlistId);
}
