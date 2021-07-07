import { TestBed } from '@angular/core/testing';

import { Calification.ServiceService } from './calification.service.service';

describe('Calification.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Calification.ServiceService = TestBed.get(Calification.ServiceService);
    expect(service).toBeTruthy();
  });
});
