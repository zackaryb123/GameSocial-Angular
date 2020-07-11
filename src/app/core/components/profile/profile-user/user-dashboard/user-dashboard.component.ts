import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDashboardComponent implements OnInit {
  @Input() user;
  closeResult: string;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

}
