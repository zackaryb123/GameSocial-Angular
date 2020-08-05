import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StatisticsService} from '../../../core/services/statistics/statistics-service.service';
import {isNewChange} from '../../utils/data.utils';

@Component({
  selector: 'views',
  styleUrls: ['./views.component.scss'],
  template: `
    <span
      *ngIf="views"
      class="item-views item-action"
      rel="tooltip"
      title="Views">
      <icon name="eye"></icon>
      {{ views | number:'2.0'}}
    </span>
  `
})
export class ViewsComponent implements OnInit, OnChanges {
  @Input() views: any;
  @Input() clipId: any;
  @Input() enableCount: boolean;
  ipAddress: any;
  constructor(
    private statService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statService.getIPAddress().toPromise().then((ipData: any) => {
      this.ipAddress = ipData.ip;
      if (this.enableCount && this.clipId) {
        this.statService.incrementViews(this.clipId, this.ipAddress).then(views => {
          this.views = views;
        });
      }
    });
  }

  ngOnChanges({clipId}: SimpleChanges): void {
    if (clipId && isNewChange(clipId)) {
      this.statService.incrementViews(clipId.currentValue, this.ipAddress).then(views => {
        this.views = views;
      });
    }
  }

}
