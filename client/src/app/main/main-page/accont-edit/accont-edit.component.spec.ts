import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccontEditComponent } from './accont-edit.component';

describe('AccontEditComponent', () => {
  let component: AccontEditComponent;
  let fixture: ComponentFixture<AccontEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccontEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccontEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
