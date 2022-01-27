import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceExplorerComponent } from './interface-explorer.component';

describe('InterfaceExplorerComponent', () => {
  let component: InterfaceExplorerComponent;
  let fixture: ComponentFixture<InterfaceExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
