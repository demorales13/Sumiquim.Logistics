import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingLineAdmonComponent } from './shipping-line-admon.component';

describe('ShippingLineAdmonComponent', () => {
  let component: ShippingLineAdmonComponent;
  let fixture: ComponentFixture<ShippingLineAdmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingLineAdmonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingLineAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
