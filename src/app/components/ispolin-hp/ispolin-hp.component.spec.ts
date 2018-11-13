import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspolinHpComponent } from './ispolin-hp.component';

describe('IspolinHpComponent', () => {
  let component: IspolinHpComponent;
  let fixture: ComponentFixture<IspolinHpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspolinHpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspolinHpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
