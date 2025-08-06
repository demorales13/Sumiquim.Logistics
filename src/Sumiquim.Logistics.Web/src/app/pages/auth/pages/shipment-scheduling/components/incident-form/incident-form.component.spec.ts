import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentFormComponent } from './incident-form.component';

describe('FormComponent', () => {
  let component: IncidentFormComponent;
  let fixture: ComponentFixture<IncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
