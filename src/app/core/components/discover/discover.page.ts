import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-discover.page',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
