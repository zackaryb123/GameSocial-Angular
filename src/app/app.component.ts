import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameSocialState} from './core/store/reducers';
import {select, Store} from '@ngrx/store';
import {PresenceService} from './core/services/presence/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    public presence: PresenceService,
    private store: Store<GameSocialState>,
  ) {
  }

  ngOnInit(): void {
  }

}
