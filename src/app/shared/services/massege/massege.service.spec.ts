import { TestBed } from '@angular/core/testing';

import { MassegeService } from './massege.service';

describe('MassegeService', () => {
  let service: MassegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
