import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user';
import {AuthService} from '../../../../services/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GameClipNode} from '../../../../interfaces/xbox.interfaces';

@Component({
  selector: 'user-videos',
  styleUrls: ['./user-videos.component.scss'],
  template: `
    <separator
      [title]="'My Game Clips'">
    </separator>
    <video-list2 *ngIf="videos$"
      [list]="videos$">
    </video-list2>
  `
})
export class UserVideosComponent implements OnInit {
  @Input() userUID: any;
  videos$: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    // this.videos$ = this.userService.getUserClips2(this.userUID);

    this.userService.getUserClips2(this.userUID)
      .then((data) => {
        console.log('this.videos$: ', data);
        this.videos$ = data;
    });
  }

}
