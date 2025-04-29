import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Receiver } from '../../../core/models/receiver.model';
import { ReceiverService } from '../../../core/services/receiver.service';
import { NotificationService } from '../../../core/services/notification.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  imports: [ReactiveFormsModule, NgIf],
})
export class VerifyPhoneComponent implements OnInit {
  @Input() receiver!: Receiver;
  @Output() close = new EventEmitter<void>();
  @Output() verified = new EventEmitter<boolean>();

  form!: FormGroup;
  isSubmitting = false;
  isResending = false;
  countdown = 0;
  countdownInterval: any;

  constructor(
    private fb: FormBuilder,
    private receiverService: ReceiverService,
    private notificationService: NotificationService
  ) {}

  // Form validation helpers
  get codeControl() {
    return this.form.get('code');
  }

  ngOnInit(): void {
    this.initForm();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.get('code')?.markAsTouched();
      return;
    }

    this.isSubmitting = true;
    const code = this.form.get('code')?.value;

    this.receiverService.verifyPhoneNumber(this.receiver.id!, code).subscribe(
      (isVerified) => {
        if (isVerified) {
          this.notificationService.showSuccess(
            'Phone number verified successfully'
          );
          this.verified.emit(true);
          this.close.emit();
        } else {
          this.notificationService.showError('Invalid verification code');
          this.isSubmitting = false;
        }
      },
      (error) => {
        this.notificationService.showError('Failed to verify phone number');
        this.isSubmitting = false;
      }
    );
  }

  onResend(): void {
    if (this.countdown > 0) {
      return;
    }

    this.isResending = true;
    this.receiverService.sendVerificationCode(this.receiver.id!).subscribe({
      next: () => {
        this.notificationService.showInfo('Verification code sent');
        this.startCountdown();
        this.isResending = false;
      },
      error: (error) => {
        this.notificationService.showError('Failed to send verification code');
        this.isResending = false;
      },
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  private initForm(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  private startCountdown(): void {
    this.countdown = 60;
    this.stopCountdown();

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.stopCountdown();
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
}
