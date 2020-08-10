import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'loading',
  styleUrls: ['./loading.component.scss'],
  template: `
    <div *ngIf="loading" class="container">
      <div class="row">
        <div id="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="loading"></div>
        </div>

        <p class="spinner-message" *ngIf="message && message !== ''">
          {{message}}
        </p>
      </div>
    </div>
  `
})
export class LoadingComponent implements OnInit {
  @Input() message = '';
  @Input() loading = true;
  constructor() { }

  ngOnInit(): void {
  }

}
