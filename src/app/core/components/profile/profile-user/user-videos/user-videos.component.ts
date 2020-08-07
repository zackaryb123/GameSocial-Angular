import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GameClipsService} from '../../../../services/game-clips/game-clips.service';

@Component({
  selector: ' user-videos',
  styleUrls: ['./user-videos.component.scss'],
  template: `
    <separator
      [title]="'My Game Clips'">
    </separator>
    <video-list2
      *ngIf="videos$"
      [authUser]="authUser"
      [page]="'profile'"
      [list]="videos$"
      (refresh)="refreshClips($event)">
    </video-list2>
  `
})
export class UserVideosComponent implements OnInit {
  @Input() userUID: any;
  @Input() authUser: any;
  videos$: any;

  constructor(
    private authService: AuthService,
    private gameClipService: GameClipsService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.gameClipService.getUserClipsServer(this.userUID)
      .then((data) => {
        this.videos$ = data;
    });
  }

  refreshClips(event: boolean) {
    if (event) {
      this.gameClipService.getUserClipsServer(this.userUID)
        .then((data) => {
          this.videos$ = data;
        });
    }
  }

}
