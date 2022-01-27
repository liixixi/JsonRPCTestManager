import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionViewerComponent } from './function-viewer.component';

describe('FunctionViewerComponent', () => {
  let component: FunctionViewerComponent;
  let fixture: ComponentFixture<FunctionViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
