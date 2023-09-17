import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDashboardComponent } from './prize-dashboard.component';

describe('PrizeDashboardComponent', () => {
  let component: PrizeDashboardComponent;
  let fixture: ComponentFixture<PrizeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrizeDashboardComponent]
    });
    fixture = TestBed.createComponent(PrizeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
