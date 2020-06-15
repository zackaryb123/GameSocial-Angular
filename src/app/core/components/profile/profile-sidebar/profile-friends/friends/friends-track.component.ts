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
import {PresenceService} from '../../../../../services/presence/presence.service';
import {AppService} from '../../../../../services/app/app.service';
import {AuthService} from '../../../../../services/auth';
import {ChatService} from '../../../../../services/chat/chat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'friends-track',
  styleUrls: ['./friends-track.scss'],
  template: `
  <div class="now-playlist-track__trigger">
    <div class="track-contents">
      <section class="video-thumb playlist-track__thumb"
        (click)="markSelected(friend)">
<!--        <span class="track-number">{{ index + 1 }}</span>-->
        <img draggable="false" class="video-thumb__image"
        srcset="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png 1x, https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png 1.778x"
        xtitle="Drag to sort">
        <span class="badge badge-info">
          pr0Xt0Xtype18
        </span>
      </section>

      <section class="video-title" (click)="markSelected(friend)" [title]="friend.fname + ' ' + friend.lname">Zack Blaylock</section>
    </div>
    <aside class="playlist-track__content">
      <section class="track-actions">
        <button class="btn btn-transparent text-primary playlist-track"
          *ngIf="isPlaylistMedia(friend.uid)"
          (click)="handleToggleTracks($event, friend)"
          title="Album Track - click to select cued tracks">
          <icon name="list-ul"></icon>
        </button>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn btn-transparent text-info playlist-track"
                  [routerLink]="[{outlets: { profile: 'chat' }}]"
                  (click)="chat()"
                  title="More information for this media">
            <icon name="comments"></icon>
          </button>
          <button class="btn btn-transparent text-info playlist-track"
            (click)="toggleInfo()"
            title="More information for this media">
            <icon name="info-circle"></icon>
          </button>
        </div>
      </section>
      <div class="btn btn-transparent text-danger ux-maker remove-track" title="Remove From Playlist"
        (click)="remove.emit(friend)">
        <icon *ngIf="presence$ | async as presence"
          [ngClass]="{
          'is-online':  presence.status  === 'online',
          'is-away': presence.status  === 'away',
          'is-offline':  presence.status  === 'offline',
          'status-sidebar-closed': (sidebarToggle$ | async) === true
          }"
          name="circle"></icon>
      </div>
    </aside>
    <article [@flyInOut] *ngIf="displayTracks" class="track-tracks list-group">
      <aside class="album-tracks-heading">Tracks</aside>
      <button type="button" class="list-group-item btn-transparent"
        *ngFor="let track of tracks"
        (click)="handleSelectTrack($event, track, friend)">
        {{ track }}
      </button>
    </article>
    <article [@flyOut] *ngIf="displayInfo" class="track-info">
      {{ friend.bio }}
    </article>
  </div>
  `,
  animations: [flyOut, flyInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsTrackComponent implements OnInit, AfterContentInit {
  @Input() friend;

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
  presence$: any;
  private parsedTracks = false;

  constructor(
    private presence: PresenceService,
    private appService: AppService,
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.presence$ = this.presence.getPresence(this.friend.uid);
  }

  ngAfterContentInit() {
    this.extractTracks(this.friend);
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

  markSelected(user: any) {
    this.select.emit(user);
  }

  toggleInfo() {
    this.displayInfo = !this.displayInfo;
    return this.displayInfo;
  }

  chat() {
    return this.chatService.start(this.friend.uid);
  }
}
