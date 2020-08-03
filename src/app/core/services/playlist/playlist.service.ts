import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as playlistStore from '../../store/playlist';
import {GameSocialState} from '../../store/reducers';
import {getPlaylist, getSelectedPlaylistVideos, getSelectedVideo, getSelectedPlaylistId} from '../../store/playlist';
import {switchMap, take} from 'rxjs/operators';
import { firestore } from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class PlaylistService {
  playlists$: Observable<any>; // = this.store.select(getPlaylist);
  selectedPlaylistId$ = this.store.select(getSelectedPlaylistId);
  selectedPlaylist$ = this.store.select(getSelectedPlaylistVideos);
  selectedVideo$ = this.store.select(getSelectedVideo);



  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private store: Store<GameSocialState>,
    private afAuth: AngularFireAuth
  ) {
    this.watchPlaylist();
  }

  /* --- FIREBASE --- */

  watchPlaylist() {
    this.playlists$ = this.afAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.afStore.doc<any>(`users/${auth.uid}`).collection('playlist').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  watchPlaylistById(playlistId) {
    return this.selectedPlaylistId$.pipe(
      switchMap((value: any, index: number): Observable<any> => {
        return this.playlists$ = this.afAuth.user.pipe(
          switchMap( (auth) => {
            if (auth) {
              return this.afStore.doc<any>(`users/${auth.uid}/playlist/${playlistId}`).valueChanges();
            } else {
              return of(null);
            }
          })
        );
      })
    );
  }

  getPlaylistPromise(authUid) {
    return this.afStore.collection(`users/${authUid}/playlist`).get().toPromise().then(data => {
      return data.docs.map(item => item.data());
    });
  }

  getPlaylistByIdPromise(authUid, playlistId) {
    return this.afStore.doc(`users/${authUid}/playlist/${playlistId}`).get().toPromise();
  }

  addPlaylist(authUid, name) {
    const addPlaylistRef = this.afStore.collection(`users/${authUid}/playlist`);
    return addPlaylistRef.add({
      clips: [],
      name
    }).then(data => {
      console.log(data);
      return addPlaylistRef.doc(data.id).update({
        id: data.id
      });
    });
  }

  addToPlaylist(authUid, clipId, playlistId) {
    const playlistRef = this.afStore.collection('users').doc(authUid).collection('playlist').doc(playlistId);
    playlistRef.get().toPromise().then(snap => {
      const clips: any[] = snap.data().clips;
      console.log(clips);
      if (!clips.includes(clipId)) {
        return playlistRef.update({
            clips: firestore.FieldValue.arrayUnion(clipId)
          });
      }
    });
  }

  removeFromPlaylist(authId, mediaId, playlistId) {
    return this.afStore.doc(`users/${authId}/playlist/${playlistId}`).update({
      clips: firestore.FieldValue.arrayRemove(mediaId)
    });
  }

  /* --- STORE --- */

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
    return this.selectedVideo$.pipe(take(1)).subscribe(data => {
      return data;
    });
  }

  updatePlaylistIndex(mediaId: string) {
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
