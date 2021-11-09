import { TestBed } from '@angular/core/testing';

import { SubModelService } from './sub-model.service';

describe('SubModelService', () => {
  let service: SubModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
