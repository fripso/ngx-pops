import { TestBed } from '@angular/core/testing';

import { PopupsService } from './popups.service';

describe('PopupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupsService = TestBed.get(PopupsService);
    expect(service).toBeTruthy();
  });
});
