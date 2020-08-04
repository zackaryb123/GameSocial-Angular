import {Component, Input, OnInit} from '@angular/core';
import {StatisticsService} from '../../../core/services/statistics/statistics-service.service';
// var ip = require('ip');


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
export class ViewsComponent implements OnInit {
  @Input() views: any;
  @Input() clipId: any;
  @Input() enableCount: boolean;
  ipAddress: any;
  constructor(
    private statService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statService.getIPAddress().toPromise().then(ip => {
      this.ipAddress = ip;
    });
    // const clientIp = ip.address();
    console.log('clientIp: ', this.ipAddress);
    if (this.enableCount) {
      this.statService.incrementViews(this.clipId, this.ipAddress).then(views => {
        console.log('views: ', views);
        this.views = views;
      });
    }
    // this.statService.getViewsPromise(views => {
    //   this.views = views;
    // });
  }

}
