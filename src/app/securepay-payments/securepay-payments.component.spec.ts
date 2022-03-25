import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurepayPaymentsComponent } from './securepay-payments.component';

describe('SecurepayPaymentsComponent', () => {
  let component: SecurepayPaymentsComponent;
  let fixture: ComponentFixture<SecurepayPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurepayPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurepayPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
