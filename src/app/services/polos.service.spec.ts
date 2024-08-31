import { TestBed } from '@angular/core/testing';

import { PolosService } from './polos.service';

describe('PolosService', () => {
  let service: PolosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
