import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingLineComponent } from './shipping-line.component';

describe('ShippingLineComponent', () => {
  let component: ShippingLineComponent;
  let fixture: ComponentFixture<ShippingLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
