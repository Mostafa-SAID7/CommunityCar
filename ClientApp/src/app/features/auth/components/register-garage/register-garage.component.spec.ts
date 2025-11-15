import { ComponentFixture, TestBed } from '@angular/core/testing';

import RegisterGarageComponent from './register-garage.component';

describe('RegisterGarageComponent', () => {
  let component: RegisterGarageComponent;
  let fixture: ComponentFixture<RegisterGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterGarageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});