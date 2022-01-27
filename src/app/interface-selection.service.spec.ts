import { TestBed } from '@angular/core/testing';

import { InterfaceSelectionService } from './interface-selection.service';

describe('InterfaceSelectionService', () => {
  let service: InterfaceSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
