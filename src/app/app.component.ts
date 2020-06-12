import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameSocialState} from './core/store/reducers';
import {select, Store} from '@ngrx/store';
import {PresenceService} from './core/services/presence/presence.service';
import {MessagingService} from './core/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'push-notification';
  message;

  constructor(
    public presence: PresenceService,
    private store: Store<GameSocialState>,
    private msgService: MessagingService
  ) {
    this.msgService.requestPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage;
  }

  ngOnInit(): void {
  }

}
