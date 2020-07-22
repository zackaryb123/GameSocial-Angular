import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {GameClipsService} from '../../services/game-clips/game-clips.service';
import {UserService} from '../../services/user';
import {XboxService} from '../../services/3rd-party/microsoft/xbox.service';
import {AuthService} from '../../services/auth';

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
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  isLg: any = false;

  constructor(
    private route: ActivatedRoute,
    private gameClipsService: GameClipsService,
    private userService: UserService,
    private xboxService: XboxService,
    private authService: AuthService,
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
            console.log('DATA: ', data);
            this.userId = data.uid;
            this.userService.getUser(this.userId).then(user => {
              this.user = user;
              console.log('this.user: ', this.user);
            });
            this.xboxService.getXboxGameClip(data.xuid, data.scid, data.gameClipId).then(xboxclip => {
              this.clip = xboxclip.gameClip;
            });
          });
        }
      });
  }

  getExploreClips() {

  }

  trackByCreated(i, msg) {
    return msg.timeStamp;
  }

  isAuthUser(msgUid: any) {
    return msgUid === this.authUser.uid;
  }

  submit() {
    this.newMsg = '';
  }



}
