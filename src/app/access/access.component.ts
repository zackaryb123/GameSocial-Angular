import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
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

export class AccessComponent implements OnInit {
  public stateBanner = 'created';
  public statePanel = 'created';

  public register = false;

  constructor() { }

  ngOnInit() {
  }

  public displayPanel(event: string): void {
    this.register = event === 'register';
    console.log(event);
  }

}
