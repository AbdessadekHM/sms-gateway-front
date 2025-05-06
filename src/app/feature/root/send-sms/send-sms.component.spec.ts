import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsComponent } from './send-sms.component';

describe('SendSmsComponent', () => {
  let component: SendSmsComponent;
  let fixture: ComponentFixture<SendSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendSmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
