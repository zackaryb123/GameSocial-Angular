import { TestBed } from '@angular/core/testing';

import { StatisticsServiceService } from './statistics-service.service';

describe('StatsServiceService', () => {
  let service: StatisticsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
