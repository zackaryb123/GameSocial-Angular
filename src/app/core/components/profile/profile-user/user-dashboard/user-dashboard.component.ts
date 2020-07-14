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
  @Input() user;
  videos$: GameClipNode[];
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  userGameClips: any[];
  continuationToken$: any;
  modalTitle: any;
  closeResult: string;

  constructor(
    private xboxService: XboxService,
    private modalService: NgbModal,
    private gameClipsService: GameClipsService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userService.userGameClips$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(data => {
      this.userGameClips = data;
      console.log('DATA: ', data);
    });
  }

  ngOnInit() {

  }

  async openXboxModal(content) {
    const res = await this.xboxService.getGameClips('pr0Xt0Xtype18');
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
    const exist: any[] = this.userGameClips.filter(item => item.providerClipId === gameClipId);
    return !(exist.length > 0);
  }

}
