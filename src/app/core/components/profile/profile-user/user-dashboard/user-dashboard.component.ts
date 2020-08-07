import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GameClipNode} from '../../../../interfaces/xbox.interfaces';
import {XboxService} from '../../../../services/3rd-party/microsoft/xbox.service';
import {fadeInAnimation} from '../../../../../shared/animations';
import {GameClipsService} from '../../../../services/game-clips/game-clips.service';
import {AuthService} from '../../../../services/auth';
import {UserService} from '../../../../services/user';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class UserDashboardComponent implements OnInit {
  @Input() authId;
  @Input() user;
  videos$: GameClipNode[];
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  // userGameClips$: Observable<any>;
  userGameClips: any;
  continuationToken$: any;
  modalTitle: any;
  closeResult: string;

  constructor(
    private userService: UserService,
    private xboxService: XboxService,
    private modalService: NgbModal,
    private gameClipsService: GameClipsService,
    private authService: AuthService,
  ) {
    // this.userGameClips$ = this.gameClipsService.userGameClips$;
  }

  async ngOnInit() {
    await this.userService.getUser(this.authId).then(user => {
      console.log('USER: ', user);
      this.user = user;
    });
    await this.gameClipsService.getUserGameClipsPromise(this.authId).then(clips => {
      this.userGameClips = clips;
    });
  }

  async openXboxModal(content, user) {
    const res = await this.xboxService.getXboxGameClips(user.gamertag);
    this.videos$ = res.gameClips;
    this.continuationToken$ = res.continuationToken;
    this.modalTitle = 'My Xbox Clips';
    this.modalService.open(content, { size: 'xl' });
  }

  async addVideoToPlaylist(media) {
    const {uid} = await this.authService.getAuth();
    this.gameClipsService.addGameClip(media, uid);
  }

  isAdded(gameClipId) {
    console.log(this.userGameClips);
    const exist: any[] = this.userGameClips.filter(item => item.gameClipId === gameClipId);
    return !(exist.length > 0);
  }

}
