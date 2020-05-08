import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth';
import { Router} from '@angular/router';
import {FirebaseUserModel} from '../../core/models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {PostModel} from '../../core/models/post.model';
import {AppDispatcher} from '../../core/dispatcher/app.dispatcher';

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
  sidebarToggle$ = this.appDispatch.sidebarToggle$;
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private appDispatch: AppDispatcher,
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {
  }

}

