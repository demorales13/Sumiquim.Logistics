import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingHeaderAdmonComponent } from './shipping-header-admon.component';

describe('ShippingHeaderAdmonComponent', () => {
  let component: ShippingHeaderAdmonComponent;
  let fixture: ComponentFixture<ShippingHeaderAdmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingHeaderAdmonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingHeaderAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
