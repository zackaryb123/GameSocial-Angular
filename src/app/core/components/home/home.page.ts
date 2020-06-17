import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';
import { Router} from '@angular/router';
import {FirebaseUserModel} from '../../models/user.model';
import {AppService} from '../../services/app/app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  sidebarToggle$ = this.appService.sidebarToggle$;
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

}

