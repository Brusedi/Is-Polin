import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasIspComponent } from './canvas-isp.component';

describe('CanvasIspComponent', () => {
  let component: CanvasIspComponent;
  let fixture: ComponentFixture<CanvasIspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasIspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasIspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
