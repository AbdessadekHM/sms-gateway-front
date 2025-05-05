import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverComponent } from './add-receiver.component';

describe('AddRecieverComponent', () => {
  let component: AddReceiverComponent;
  let fixture: ComponentFixture<AddReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReceiverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
