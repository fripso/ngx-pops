import { TestBed } from '@angular/core/testing';

import { PopsService } from './pops.service';

describe('PopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopsService = TestBed.get(PopsService);
    expect(service).toBeTruthy();
  });
});
