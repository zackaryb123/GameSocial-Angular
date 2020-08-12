import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {flyInOut, flyOut} from '../../../../../../shared/animations/fade-in.animation';
import {AppService} from '../../../../../services/app/app.service';
import {PlaylistService} from '../../../../../services/playlist/playlist.service';

@Component({
  selector: 'playlist-track',
  styleUrls: ['./playlist-track.scss'],
  template: `
  <div class="now-playlist-track__trigger" [ngClass]="{'hide-box': (sidebarToggle$ | async)}" >
    <div class="track-contents">
      <section class="video-thumb playlist-track__thumb"
        (click)="markSelected(video)">
        <span class="track-number">{{ index + 1 }}</span>
        <img draggable="false" class="video-thumb__image"
             [src]="video.thumbnails[0].uri"
        xtitle="Drag to sort">
        <span class="badge badge-info">
          {{ video.durationInSeconds }}
        </span>
      </section>

      <section class="video-title" (click)="markSelected(video)" [title]="video.titleName">{{ video.titleName }}</section>
      </div>
    <aside class="playlist-track__content">
      <section *ngIf="!(sidebarToggle$ | async)" class="track-actions">
        <button class="btn btn-transparent text-primary playlist-track"
          *ngIf="isPlaylistMedia(video)"
          (click)="handleToggleTracks($event, video)"
          title="Album Track - click to select cued tracks">
          <icon name="list-ul"></icon>
        </button>
        <button class="btn btn-transparent text-info playlist-track"
          (click)="toggleInfo()"
          title="More information for this media">
          <icon name="info-circle"></icon>
        </button>
      </section>
      <button class="btn btn-transparent text-danger ux-maker remove-track" title="Remove From Playlist"
        (click)="removeFromPlaylist(video.id)">
        <icon name="trash"></icon>
      </button>
    </aside>
    <article [@flyInOut] *ngIf="displayTracks" class="track-tracks list-group">
      <aside class="album-tracks-heading">Tracks</aside>
      <button type="button" class="list-group-item btn-transparent"
        *ngFor="let track of tracks"
        (click)="handleSelectTrack($event, track, video)">
        {{ track }}
      </button>
    </article>
    <article [@flyOut] *ngIf="displayInfo" class="track-info">
      {{ video.userCaption}}
    </article>
  </div>
  `,
  animations: [flyOut, flyInOut],
})
export class PlaylistTrackComponent implements OnInit, AfterContentInit {
  @Input() video: any;
  @Input() index: number;
  @Input() authId: any;
  @Input() selectedPlaylist: any;
  sidebarToggle$ = this.appService.sidebarToggle$;
  @Output() remove = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: any;
  }>();
  displayTracks = false;
  displayInfo = false;
  tracks: string[] = [];
  hasTracks = false;
  private parsedTracks = false;

  constructor(
    private appService: AppService,
    private playlistService: PlaylistService
    ) {}

  ngOnInit(): void {
    console.log('Selected playlist id: ', this.selectedPlaylist.id);
  }

  ngAfterContentInit() {
    this.extractTracks(this.video);
  }

  extractTracks(media: any) {
    if (!this.parsedTracks) {
      // const tracks = this.mediaParser.extractTracks(media.snippet.description);
      // if (Array.isArray(tracks)) {
      //   this.parsedTracks = true;
      //   this.tracks = tracks;
      //   this.hasTracks = true;
      // }
    }
  }

  removeFromPlaylist(mediaId) {
    if (confirm('Are you sure you want to delete?')) {
      return this.playlistService.removeFromPlaylist(this.authId, mediaId, this.selectedPlaylist.id);
    }
  }

  isPlaylistMedia(media: any) {
    return this.hasTracks;
  }

  toggleTracks(media: any) {
    this.displayTracks = !this.displayTracks;
    return this.displayTracks;
  }

  handleToggleTracks(event: Event, media: any) {
    event.stopImmediatePropagation();
    this.toggleTracks(media);
  }

  handleSelectTrack(
    $event: Event,
    track: string,
    media: any
  ) {
    $event.stopImmediatePropagation();
    // const time = this.mediaParser.extractTime(track);
    // if (time) {
    //   this.selectTrack.emit({ time: time[0], media });
    // }
  }

  markSelected(video: any) {
    this.select.emit(video);
  }

  toggleInfo() {
    this.displayInfo = !this.displayInfo;
    return this.displayInfo;
  }
}
