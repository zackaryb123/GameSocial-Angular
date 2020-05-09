// import { MediaParserService, YoutubePlayerService } from '@core/services';
import { Store } from '@ngrx/store';
import {GameSocialState} from '../store/reducers';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as playlistStore from '../../core/store/playlist';
// import { UserProfile } from '@core/services/user-profile.service';
import { map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import {toPayload} from '../../shared/utils/data.utils';

@Injectable()
export class PlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<GameSocialState>,
    // private mediaParser: MediaParserService,
    // private playerService: YoutubePlayerService,
    // private userProfile: UserProfile
  ) {}

  // @Effect()
  // queueVideo$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.SELECT),
  //   map(toPayload),
  //   map(
  //     (media: any) =>
  //       new playlistStore.QueueVideo(media)
  //   )
  // );
  //
  // @Effect()
  // playerStateChange$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.PLAYER_STATE_CHANGE),
  //   map(toPayload),
  //   filter((data: any) => data === 0),
  //   map(() => new playlistStore.MediaEnded())
  // );
  //
  // /* if it's the last track
  //  * AND repeat is on
  //  * THEN play the first track
  // **/
  @Effect()
  loadNextTrack$ = this.actions$.pipe(
    ofType(playlistStore.PlaylistActionTypes.MEDIA_ENDED),
    map(toPayload),
    withLatestFrom(this.store.select(playlistStore.getSelectedMedia)),
    filter(
      (states: [any, any]) =>
        states[1] && states[1].hasOwnProperty('id')
    ),
    map(
      (states: [any, any]) =>
        new playlistStore.SelectVideo(states[1])
    )
  );
  //
  // @Effect()
  // selectBeforeSeekToTime$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.SELECT_AND_SEEK_TO_TIME),
  //   map(toPayload),
  //   map(
  //     trackEvent => new playlistStore.UpdateIndexByMedia(trackEvent.media.id)
  //   )
  // );
  //
  // @Effect({ dispatch: false })
  // seekToTime$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.SELECT_AND_SEEK_TO_TIME),
  //   map(toPayload),
  //   tap(trackEvent => {
  //       // this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time))
  //     })
  // );
  //
  // @Effect()
  // loadPlaylist$ = null;
  //   // this.actions$.pipe(
  //   // ofType(playlistStore.ActionTypes.LOAD_PLAYLIST_START),
  //   // map(toPayload),
  //   // switchMap(
  //   //   (id: string) => this.userProfile.fetchAllPlaylistItems(id))
  //   // , map(
  //   //   (playlistItems: any[]) =>
  //   //     new playlistStore.LoadPlaylistEndAction(playlistItems)
  //   // )
  // // );
  //
  // @Effect()
  // addPlaylistItems$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.LOAD_PLAYLIST_END),
  //   map(toPayload),
  //   map(
  //     (playlistItems: any[]) =>
  //       new playlistStore.QueueVideos(playlistItems)
  //   )
  // );
  //
  @Effect()
  playPlaylistFirstTrack$ = this.actions$.pipe(
    ofType(playlistStore.PlaylistActionTypes.LOAD_PLAYLIST_END),
    map(toPayload),
    map(
      (playlistItems: any[]) =>
        new playlistStore.SelectVideo(playlistItems[0])
    )
  );
  //
  // @Effect()
  // playPlaylist$ = this.actions$.pipe(
  //   ofType(playlistStore.PlaylistActionTypes.PLAY_PLAYLIST),
  //   map(toPayload),
  //   map((id: string) => new playlistStore.LoadPlaylistAction(id))
  // );
}
