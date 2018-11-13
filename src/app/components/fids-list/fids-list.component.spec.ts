import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidsListComponent } from './fids-list.component';

describe('FidsListComponent', () => {
  let component: FidsListComponent;
  let fixture: ComponentFixture<FidsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
