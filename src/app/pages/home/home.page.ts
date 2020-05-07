import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth';
import { Router} from '@angular/router';
import {FirebaseUserModel} from '../../core/models/user.model';
import {Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {PostModel} from '../../core/models/post.model';
import {Store} from '@ngrx/store';
import {GameSocialState} from '../../core/store/reducers';
import {getSidebarCollapsed} from '../../core/store/app/app-selectors';

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
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  user: FirebaseUserModel = new FirebaseUserModel();
  ngUnsubscribe: Subject<any> = new Subject();
  posts: PostModel[] = posts;

  constructor(
    private store: Store<GameSocialState>,
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {
  }

}

