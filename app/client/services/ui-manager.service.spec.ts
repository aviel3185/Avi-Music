import { TestBed } from '@angular/core/testing';

import { UIManagerService } from './ui-manager.service';

describe('UIManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIManagerService = TestBed.get(UIManagerService);
    expect(service).toBeTruthy();
  });
});
