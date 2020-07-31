import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {GameClipsService} from '../../services/game-clips/game-clips.service';
import {UserService} from '../../services/user';
import {XboxService} from '../../services/3rd-party/microsoft/xbox.service';
import {AuthService} from '../../services/auth';
import {CommentsService} from '../../services/comments/comments.service';

@Component({
  selector: 'clip-page',
  templateUrl: './clip-page.component.html',
  styleUrls: ['./clip-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipPageComponent implements OnInit, OnChanges {
  clipId: any;
  clip: any = {};
  userId: any;
  user: any;
  authUser: any;
  newMsg: any;
  exploreClips: any;
  comments$: any;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  isLg: any = false;

  constructor(
    private route: ActivatedRoute,
    private gameClipsService: GameClipsService,
    private userService: UserService,
    private xboxService: XboxService,
    private authService: AuthService,
    private commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    // Get Auth User
    this.authService.getAuthUser().then(auth => {
      this.authUser = auth;
    });

    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(routeParams => {
        if (routeParams) {
          console.log('ROUTE PARAMS: ', routeParams);
          this.clipId = routeParams.uid;
          this.gameClipsService.getGameClip(this.clipId).then(data => {
            this.userId = data.uid;
            // Get Game Clip
            this.xboxService.getXboxGameClip(data.xuid, data.scid, data.gameClipId).then(xboxclip => {
              this.clip = xboxclip.gameClip;
            });
            // Get User
            this.userService.getUser(this.userId).then(user => {
              this.user = user;
            });
            // Get User Explore Clips
            this.gameClipsService.getExploreClips(this.userId).then(expClips => {
              this.exploreClips = expClips;
            });
          });
        }
      });
    // Observe Comments
    this.commentsService.watchClipComments(this.clipId).pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(comments => {
        this.comments$ = comments;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES: ', changes);
  }

  getNewExploreClips() {
    this.gameClipsService.getExploreClips(this.userId).then(expClips => {
      this.exploreClips = expClips;
    });
  }

  trackByCreated(i, msg) {
    return msg.timeStamp;
  }

  isAuthUser(msgUid: any) {
    return this.authUser && msgUid === this.authUser.uid;
  }

  submit() {
    this.commentsService.addClipComment(this.newMsg, this.clipId, this.authUser.uid);
    this.newMsg = '';
  }



}
