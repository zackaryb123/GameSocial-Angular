import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export let formAnimation =
trigger('animation-form', [
  state('normal', style({opacity: 1})),

  transition('normal => invalid', [
    style({
      opacity: 0}
    ),
    animate( '700ms 0s ease-in-out',
    keyframes([
      style({offset: 0.1, opacity: 1, transform: 'translate(20px,0px)'}),
      style({offset: 0.2, opacity: 1, transform: 'translate(-20px,0px)'}),
      style({offset: 0.3, opacity: 1, transform: 'translate(20px,0px)'}),
      style({offset: 0.4, opacity: 1, transform: 'translate(-20px,0px)'}),
      style({offset: 0.5, opacity: 1, transform: 'translate(20px,0px)'}),
      style({offset: 0.6, opacity: 1, transform: 'translate(-20px,0px)'}),
      style({offset: 0.7, opacity: 1, transform: 'translate(20px,0px)'}),
      style({offset: 0.8, opacity: 1, transform: 'translate(-20px,0px)'}),
      style({offset: 0.9, opacity: 1, transform: 'translate(20px,0px)'})
    ]))
  ])
]);
