import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPathComponent } from './connection-path.component';

describe('ConnectionPathComponent', () => {
  let component: ConnectionPathComponent;
  let fixture: ComponentFixture<ConnectionPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
