import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerPopupComponent } from './winner-popup.component';

describe('WinnerPopupComponent', () => {
  let component: WinnerPopupComponent;
  let fixture: ComponentFixture<WinnerPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerPopupComponent]
    });
    fixture = TestBed.createComponent(WinnerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
