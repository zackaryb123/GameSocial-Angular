import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'separator',
  styleUrls: ['./separator.component.scss'],
  template: `
    <div>
      <div class="separator-divider" role="separator">
      <span class="separator-divider-inner-text">
        <img class="diamond" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiIHN0YW5kYWxvbmU9InllcyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdib3g9IjAgMCA1OTkgNTk5IiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCI+PHBhdGggZmlsbD0iIzg3ZDA2OCIgZD0iTSAzMDAsNTc1IEwgNTc1LDMwMCBMIDMwMCwyNSBMIDI1LDMwMCBMIDMwMCw1NzUgWiIgLz48L3N2Zz4K" alt="Diamond">
        <span class="separator-text">
          {{ title }}
        </span>
      </span>
      </div>
      <div class="separator-line">
        <hr class="hr-text">
      </div>
    </div>
  `
})
export class SeparatorComponent implements OnInit {
  @Input() title;

  constructor() { }

  ngOnInit(): void {
  }

}
