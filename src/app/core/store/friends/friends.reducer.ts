import {migrateReducerState} from '../store.utils';
import {FriendsActionTypes, IFriendsAction} from './friends.actions';

export interface IFriendsStore {
  friends?: IFriends[];
  filter?: string;
  selectedFriendId?: string;
}

export interface IFriends  {
  uid?: string;
}

const newInitialState: IFriendsStore = {
  friends: [
    {
      uid: 'RA856ap4L6doLBEbyXsxESnbF7P2'
    },
  ],
  filter: '',
  selectedFriendId: 'RA856ap4L6doLBEbyXsxESnbF7P2'
};

const initialState: IFriendsStore = migrateReducerState(
  'prevFriendsStore',
  newInitialState,
  localStorage
);

export function friendsStore(
  state: IFriendsStore = initialState,
  action: IFriendsAction
): IFriendsStore {
  switch (action.type) {
    case FriendsActionTypes.SELECT:
      return { ...state, selectedFriendId: action.friend.uid };
    case FriendsActionTypes.ADD:
      return { ...state, friends: addFriend(state.friends, action.friend, action.friendId) };
    case FriendsActionTypes.REMOVE:
      return { ...state, friends: removeFriend(state.friends, action.friend) };
    case FriendsActionTypes.FILTER_CHANGE:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

function addFriend(playlists: any, playlistId: any, addedVideo: any) {
  const exist = playlists[playlistId].findIndex(video => video.id === addedVideo.id);
  const newMedias = [];
  if (exist === -1) {
    playlists[playlistId].videos.push(addedVideo);
  }
  return [...playlists, ...newMedias];
}

function filterFriends(videos: any[], filter: string) {
  const sanitizedFilter = filter.toLowerCase();
  return videos.filter(video =>
    JSON.stringify(video)
      .toLowerCase()
      .includes(sanitizedFilter)
  );
}

function getSelectedInFilteredVideos(
  friends: any[],
  filter: string,
  selectedId: string
) {
  const filteredVideos = filterFriends(friends, filter);
  const currentIndex: number = filteredVideos.findIndex(
    video => video.id === selectedId
  );
  return {
    filteredVideos,
    currentIndex
  };
}

function removeFriend(friends: IFriends[], friend: any): any[] {
  return friends.filter((f: any) => f.uid !== friend.uid);
}
