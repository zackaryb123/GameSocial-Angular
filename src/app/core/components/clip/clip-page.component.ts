import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
export class ClipPageComponent implements OnInit {
  clipId: any;
  clip: any = {};
  userId: any;
  user: any;
  authUser: any;
  newMsg: any;
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
    this.authService.getAuthUser().then(auth => {
      this.authUser = auth;
    });

    this.route.params
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(routeParams => {
        if (routeParams) {
          this.clipId = routeParams.uid;
          this.gameClipsService.getGameClip(this.clipId).then(data => {
            this.userId = data.uid;
            this.userService.getUser(this.userId).then(user => {
              this.user = user;
            });
            this.xboxService.getXboxGameClip(data.xuid, data.scid, data.gameClipId).then(xboxclip => {
              this.clip = xboxclip.gameClip;
            });
          });
        }
      });
    this.commentsService.watchClipComments(this.clipId).pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(comments => {
        this.comments$ = comments;
      });
  }

  getExploreClips() {

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
