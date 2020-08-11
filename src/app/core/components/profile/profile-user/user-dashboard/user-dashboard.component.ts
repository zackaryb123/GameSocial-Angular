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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STATIONS} from '../../../../constants/app';

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
  continuationToken: string;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  userGameClips$: Observable<any>;
  userGameClips: any;
  modalTitle: any;
  closeResult: string;

  // modal
  linkForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  accountLinkType: string;
  modalLoading: boolean;
  syncLoading: boolean;

  constructor(
    private userService: UserService,
    private xboxService: XboxService,
    private modalService: NgbModal,
    private gameClipsService: GameClipsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
  }

  async ngOnInit() {
    await this.userService.getUser(this.user.uid).then(user => {
      this.user = user;
    });
    this.gameClipsService.userGameClips$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(clips => {
        this.userGameClips = clips;
      });
    this.linkForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required],
      gamertag: ['', Validators.required],
    });
  }

  async openAccountLinkModal(content, user, type) {
    this.modalService.open(content, { size: 'xl' });
    this.modalLoading = true;
    this.accountLinkType = type;
    // Resets
    this.errorMessage = null;
    this.successMessage = null;
    this.modalTitle = 'Link Account';
    this.continuationToken = null;
    // Resets
    switch (type) {
      case STATIONS.XBOX:
        if (user.linkedAccounts?.xbox) {
          const res = await this.xboxService.getXboxGameClips(user.linkedAccounts.xbox.xuid, this.continuationToken);
          this.continuationToken = res.pagingInfo?.continuationToken;
          this.videos$ = res.gameClips;
          this.modalTitle = 'My Xbox Clips';
        }
        // this.modalLoading = false;
        break;
      case STATIONS.PSN:
        this.modalTitle = 'My Playstation Clips';
        this.videos$ = null;
        // this.modalLoading = false;
        break;
      case STATIONS.NINTENDO:
        this.modalTitle = 'My Nintendo Clips';
        this.videos$ = null;
        // this.modalLoading = false;
        break;
      default:
        this.videos$ = null;
        // this.modalLoading = false;
    }
    this.modalLoading = false;
  }

  getNextClips(user) {
    this.modalLoading = true;
    this.xboxService.getXboxGameClips(user.linkedAccounts.xbox.xuid, this.continuationToken).then(data => {
      this.continuationToken = data.pagingInfo.continuationToken;
      this.videos$ = data.gameClips;
      this.modalLoading = false;
    });
  }

  restartClips(user) {
    this.modalLoading = true;
    this.xboxService.getXboxGameClips(user.linkedAccounts.xbox.xuid, null).then(data => {
      this.continuationToken = data.pagingInfo.continuationToken;
      this.videos$ = data.gameClips;
      this.modalLoading = false;
    });
  }

  submitLinkAccount(values) {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.authId) {
      switch (this.accountLinkType) {
        case STATIONS.XBOX:
          if (!this.user.linkedAccounts?.xbox) {
            values.uid = this.authId;
            return this.xboxService.linkXboxAccount(values).then(data => {
              if (data.error) {
                this.errorMessage = data.error.message;
              } else {
                this.successMessage = 'Account Successfully Linked!';
              }
            });
          } else {
            return this.successMessage = 'Account already linked!';
          }
        case STATIONS.PSN:
          this.errorMessage = 'Playstation clips are not available at this time. Coming Soon!';
          return null;
        case STATIONS.NINTENDO:
          this.errorMessage = 'Nintendo clips are not available at this time. Coming Soon!';
          return null;
        default:
          return null;
      }
    }
  }

  syncAccount(user) {
    if (this.authId === user.uid) {
      this.syncLoading = true;
      this.xboxService.syncAccount(user).then(data => {
        console.log(data);
        this.syncLoading = false;
      }).catch(err => {
        this.syncLoading = false;
      });
    }
  }

  async addVideoToPlaylist(media) {
    const {uid} = await this.authService.getAuth();
    this.gameClipsService.addGameClip(media, uid);
  }

  isAdded(gameClipId) {
    const exist: any[] = this.userGameClips.filter(item => item.gameClipId === gameClipId);
    return !(exist.length > 0);
  }

  isAuthUser() {
   return this.authId && this.user.uid === this.authId;
  }
}
