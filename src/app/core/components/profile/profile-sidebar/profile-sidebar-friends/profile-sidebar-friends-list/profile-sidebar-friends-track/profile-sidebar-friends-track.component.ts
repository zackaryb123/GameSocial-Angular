import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {flyInOut, flyOut} from '../../../../../../../shared/animations/fade-in.animation';
import {PresenceService} from '../../../../../../services/presence/presence.service';
import {AppService} from '../../../../../../services/app/app.service';
import {ChatService} from '../../../../../../services/chat/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../../services/auth';
import {UserService} from '../../../../../../services/user';

@Component({
  selector: 'profile-sidebar-friends-track',
  styleUrls: ['./profile-sidebar-friends-track.scss'],
  template: `
  <div *ngIf="user$ | async as user" [ngClass]="{'hide-box': (sidebarToggle$ | async)}" class="now-playlist-track__trigger">
    <div  class="track-contents">
      <section class="video-thumb playlist-track__thumb"
        (click)="markSelected(user)">
<!--        <span class="track-number">{{ index + 1 }}</span>-->
        <img  draggable="false" class="video-thumb__image"
              (click)="goProfile(user.uid)"
             [src]="user.avatar"
             xtitle="Drag to sort">
        <span class="badge badge-info">
          {{user.tag}}
        </span>
      </section>
      <section
        *ngIf="!(sidebarToggle$ | async)" class="video-title"
        (click)="markSelected(user)"
        [title]="user.fname + ' ' + user.lname">{{user.fname}} {{user.lname}}</section>
    </div>
    <aside class="playlist-track__content">
      <section *ngIf="!(sidebarToggle$ | async)" class="track-actions">
        <button class="btn btn-transparent text-primary playlist-track"
          *ngIf="isPlaylistMedia(user.uid)"
          (click)="handleToggleTracks($event, user)"
          title="Album Track - click to select cued tracks">
          <icon name="list-ul"></icon>
        </button>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button *ngIf="chatId" class="btn btn-transparent text-info playlist-track"
                  (click)="chat(chatId)"
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
        (click)="remove.emit(user)">
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
        (click)="handleSelectTrack($event, track, user)">
        {{ track }}
      </button>
    </article>
    <article [@flyOut] *ngIf="displayInfo" class="track-info">
      {{ user.bio }}
    </article>
  </div>
  `,
  animations: [flyOut, flyInOut],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSidebarFriendsTrackComponent implements OnInit, AfterContentInit {
  @Input() friend;

  user$: any;
  chatId: string;
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
    private authService: AuthService,
    public presence: PresenceService,
    private appService: AppService,
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // async ngOnInit() {
  //   this.user$ =  await this.userService.getUser(this.friend.uid);
  //   this.presence$ = this.presence.getPresence(this.friend.uid);
  //   const {uid} = await this.authService.getAuth();
  //   this.chatId = this.chatService.createChatId(uid, this.friend.uid);
  //   console.log('this.user: ', this.user$);
  // }

   ngOnInit() {
     this.user$ =  this.userService.getUser(this.friend.uid);
     this.presence$ = this.presence.getPresence(this.friend.uid);
     this.authService.getAuth().then(auth => {
      this.chatId = this.chatService.createChatId(auth.uid, this.friend.uid);
    });
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

  chat(chatId: string) {
    this.chatService.start(this.friend.uid, chatId);
    return this.router.navigateByUrl(`/profile/(chat:${chatId})`);
  }

  goProfile(uid: string) {
    return this.router.navigateByUrl(`/profile/(user:${uid})`);
  }
}
