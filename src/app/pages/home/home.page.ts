import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import { Router} from '@angular/router';
import {FirebaseUserModel} from '../../core/models/user.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {PostModel} from '../../core/models/post.model';

const posts: PostModel[] = [
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
  {
    name: 'Delta',
    profileUrl: '',
    date: new Date(),
    post: 'I went to School',
    img: 'https://i.imgur.com/y45bKaJl.jpg',
    postType: 'img',
    liked: true
  },
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  ngUnsubscribe: Subject<any> = new Subject();
  posts: PostModel[] = posts;

  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {
  }

  displayId(x) {
    console.log(x);
  }

  trackByIdx(i) {
    return i;
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        console.log('res: ', res);
        return this.router.navigate(['/']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
