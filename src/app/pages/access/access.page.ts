import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
  animations: [
    trigger('animate-banner', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(-50px, 0px)'}),
        animate( '800ms 0s ease-in-out')
      ])

    ]),
    trigger('animate-panel', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(50px, 0px)'}),
        animate( '1.5s 0s ease-in-out')
      ])
    ])

  ]
})

export class AccessPage implements OnInit {
  ngUnsubscribe: Subject<any> = new Subject();
  public stateBanner = 'created';
  public statePanel = 'created';
  public register = false;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
  }

  public displayPanel(event: string): void {
    this.register = event === 'register';
    console.log(event);
  }

}
