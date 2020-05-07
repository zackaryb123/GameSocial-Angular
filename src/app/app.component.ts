import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameSocialState} from './core/store/reducers';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<GameSocialState>,
  ) {
  }

  ngOnInit(): void {
  }

}
