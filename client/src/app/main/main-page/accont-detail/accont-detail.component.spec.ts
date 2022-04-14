import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccontDetailComponent } from './accont-detail.component';

describe('AccontDetailComponent', () => {
  let component: AccontDetailComponent;
  let fixture: ComponentFixture<AccontDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccontDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccontDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
