import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Receiver } from '../../../core/models/receiver.model';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-receiver-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './receiver-form.component.html',
})
export class ReceiverFormComponent implements OnInit {
  @Input() receiver: Receiver | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Receiver>();

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [this.receiver?.id],
      name: [
        this.receiver?.name || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      phoneNumber: [
        this.receiver?.phoneNumber || '',
        [Validators.required, Validators.pattern(/[1-9]\d{1,14}$/)],
      ],
      userId: [
        this.receiver?.userId || this.authService.getUserId() || null,
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation visuals
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // If userId is disabled, we need to include its value manually
    const formValue = this.form.getRawValue();

    const receiver: Receiver = {
      id: formValue.id,
      name: formValue.name,
      phoneNumber: formValue.phoneNumber,
      userId: formValue.userId,
      verified: this.receiver?.verified || false,
    };

    this.save.emit(receiver);
  }

  onCancel(): void {
    this.close.emit();
  }

  // Form validation helpers
  get nameControl() {
    return this.form.get('name');
  }
  get phoneNumberControl() {
    return this.form.get('phoneNumber');
  }
  get userIdControl() {
    return this.form.get('userId');
  }
}
