import { TestBed } from '@angular/core/testing';

import { MosjidService } from './mosjid.service';

describe('MosjidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MosjidService = TestBed.get(MosjidService);
    expect(service).toBeTruthy();
  });
});
