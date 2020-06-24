import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatNotificationService} from '../../../services/notification/chat-notification.service';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, first, map, takeUntil} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'notification',
  styleUrls: ['./notification.component.scss'],
  template: `
    <div *ngIf="chatNotifications$ | async as chat" class="notification-icon">
      <!--                  <span class="glyphicon glyphicon-envelope"></span>-->
      <span *ngIf="(chatNotificationNum | async) !== 0" class="notification-badge badge">{{chatNotificationNum | async}}</span>
    </div>`
})
export class NotificationComponent implements OnInit {
  chatNotifications$: Observable<any>;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  chatNotificationNum: any;

  constructor(
    private afStore: AngularFirestore,
    private chatNoteService: ChatNotificationService
  ) {
    this.chatNotifications$ = this.chatNoteService.chatNotifications$;

  }

  ngOnInit() {
    this.chatNotifications$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(
      chatNotes => {
        this.chatNotificationNum = this.calculateChatNotifications(chatNotes);
      }
    );
  }

  async calculateChatNotifications(chatNotes: Array<any>) {
    let count = 0;
    for (let i = 0; i < chatNotes.length; i++) {
      await this.afStore.collection('chats').doc(chatNotes[i].id).get().pipe(first()).toPromise().then(
        data => {
          const newChats = data.data().messages.filter((item) => {
            return item.timeStamp > chatNotes[i].lastChecked;
          });
          return count += newChats.length;
        }
      );
    }
    return count;
  }
}
