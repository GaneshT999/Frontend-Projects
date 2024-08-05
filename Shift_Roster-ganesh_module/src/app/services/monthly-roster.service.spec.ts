import { TestBed } from '@angular/core/testing';

import { MonthlyRosterService } from './monthly-roster.service';

describe('MonthlyRosterService', () => {
  let service: MonthlyRosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyRosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
