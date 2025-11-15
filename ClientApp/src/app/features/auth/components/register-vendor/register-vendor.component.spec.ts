import { ComponentFixture, TestBed } from '@angular/core/testing';

import RegisterVendorComponent from './register-vendor.component';

describe('RegisterVendorComponent', () => {
  let component: RegisterVendorComponent;
  let fixture: ComponentFixture<RegisterVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});