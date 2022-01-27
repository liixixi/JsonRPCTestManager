import { TestBed } from '@angular/core/testing';

import { InterfaceParserService } from './interface-parser.service';

describe('InterfaceParserService', () => {
  let service: InterfaceParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
