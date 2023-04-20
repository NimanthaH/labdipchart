import { TestBed } from '@angular/core/testing';

import { BroadCastServiceService } from './broad-cast-service.service';

describe('BroadCastServiceService', () => {
  let service: BroadCastServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadCastServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
