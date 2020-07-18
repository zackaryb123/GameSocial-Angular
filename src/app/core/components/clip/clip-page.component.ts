import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {distinctUntilChanged, first, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {GameClipsService} from '../../services/game-clips/game-clips.service';
import {UserService} from '../../services/user';
import {XboxService} from "../../services/3rd-party/microsoft/xbox.service";

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
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private gameClipsService: GameClipsService,
    private userService: UserService,
    private xboxService: XboxService
  ) { }

  ngOnInit() {
    this.route.params
      // .pipe(first())
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(routeParams => {
        if (routeParams) {
          this.clipId = routeParams.uid;
          this.gameClipsService.getGameClip(this.clipId).then(data => {
            console.log(data.media);
            this.xboxService.getXboxGameClip(data.media.xuid, data.media.scid, data.media.gameClipId).then(xboxclip => {
              this.clip = xboxclip.gameClip;
            });

            // this.clip = data.media;
            // console.log('this.clip: ', this.clip);
          });
          // this.userId = this.clip.uid;
          // console.log('this.clipId: ', this.userId);
          // this.user = this.userService.getUser(this.userId);
          // console.log('this.user: ', this.user);
        }
      });

  }

}
