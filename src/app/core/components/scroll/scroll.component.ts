import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})

export class ScrollComponent implements OnInit {
  list = Array.from({length: 10}).map((_, i) => i);
  constructor() { }

  ngOnInit(): void {
  }

}
