import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Receiver } from '../../../core/models/Reciever';
import { Group } from '../../../core/models/Group';
import { SmsService } from '../../../core/services/sms.service';
import { ReceiverService } from '../../../core/services/receiver.service';
import { GeminiService } from '../../../core/services/gemini.service';
import { GroupService } from '../../../core/services/group.service';

@Component({
  selector: 'app-send-sms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {
  smsForm: FormGroup;
  isSubmitting = false;
  aiPrompt = '';
  isGenerating = false;
  isScheduled = false;
  minDateTime: string;
  selectedType: string | null = null;
  selectedId: number | null = null;
  phoneNumber: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private smsService: SmsService,
    private receiverService: ReceiverService,
    private router: Router,
    private geminiService: GeminiService,
    private groupService: GroupService
  ) {
    // Set minimum date-time to current time + 5 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    this.minDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm

    this.smsForm = this.fb.group({
      label: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [Validators.required, Validators.maxLength(160)]],
      scheduledDateTime: ['']
    }, { validators: this.scheduledDateValidator.bind(this) });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedType = params.get('type');
      this.selectedId = params.get('id') ? Number(params.get('id')) : null;
      this.phoneNumber = this.selectedType === 'receiver' ? params.get('id') : null;
      console.log('Route Params:', { type: this.selectedType, id: this.selectedId, phoneNumber: this.phoneNumber });
    });
  }

  toggleSchedule(): void {
    this.isScheduled = !this.isScheduled;
    const scheduledControl = this.smsForm.get('scheduledDateTime');
    if (this.isScheduled) {
      scheduledControl?.setValidators([Validators.required, this.futureDateValidator()]);
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5);
      scheduledControl?.setValue(now.toISOString().slice(0, 16));
    } else {
      scheduledControl?.clearValidators();
      scheduledControl?.setValue('');
    }
    scheduledControl?.updateValueAndValidity();
  }

  generateWithAI(): void {
    if (this.aiPrompt && !this.isGenerating) {
      this.isGenerating = true;
      this.geminiService.generate(this.aiPrompt).then(generatedMessage => {
        if (generatedMessage) {
          this.smsForm.get('message')?.setValue(generatedMessage);
          this.aiPrompt = '';
        } else {
          console.error('AI generation returned empty response');
        }
        this.isGenerating = false;
      }).catch(error => {
        console.error('Error during AI generation:', error);
        this.isGenerating = false;
      });
    }
  }

  onSubmit(): void {
    if (this.smsForm.valid && !this.isSubmitting) {
      if (this.selectedType === 'receiver' ) {
        this.onReceiverSubmit();
      }
      else if (this.selectedType === 'group') {
        this.onGroupSubmit();
      } else {
        console.error('Invalid type selected:', this.selectedType);
      }
      
      
    }
  }
  onGroupSubmit() {
    this.isSubmitting = true;
    const formValue = this.smsForm.value;
    const payload = {
      label: formValue.label,
      message: formValue.message,
      scheduledDateTime: this.isScheduled && formValue.scheduledDateTime
        ? new Date(formValue.scheduledDateTime).toISOString()
        : null
    };

    console.log('SMS Payload:', payload);
    console.log('Chosen Date:', payload.scheduledDateTime || 'Immediate');
    console.log(formValue.scheduledDateTime);

    const smsObservable = this.isScheduled
      ? this.groupService.scheduleSms(
        
          this.selectedId!,
          formValue.message,
          formValue.label,
          payload.scheduledDateTime!
        )
      : this.groupService.sendGroupSms(
          this.selectedId!,
          formValue.message,
          formValue.label
        );
    // const smsObservable = this.groupService.sendGroupSms(
    //   this.selectedId!,
    //   formValue.message,
    //   formValue.label
    // )
    if(!smsObservable) {
      return;
    }


    smsObservable.subscribe({
      next: response => {
        console.log(this.isScheduled ? 'SMS scheduled successfully' : 'SMS sent successfully', response);
        this.smsForm.reset();
        this.isSubmitting = false;
        this.isScheduled = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        console.error(this.isScheduled ? 'Error scheduling SMS' : 'Error sending SMS', error);
        this.isSubmitting = false;
      }
    });
  }


  onReceiverSubmit(){

    this.isSubmitting = true;
    const formValue = this.smsForm.value;
    const payload = {
      label: formValue.label,
      message: formValue.message,
      scheduledDateTime: this.isScheduled && formValue.scheduledDateTime
        ? new Date(formValue.scheduledDateTime).toISOString()
        : null
    };

    console.log('SMS Payload:', payload);
    console.log('Chosen Date:', payload.scheduledDateTime || 'Immediate');
    console.log(formValue.scheduledDateTime);

    const smsObservable = this.isScheduled
      ? this.smsService.scheduleSms(
          formValue.label,
          this.phoneNumber || '',
          formValue.message,
          payload.scheduledDateTime!
        )
      : this.smsService.sendSms(
          formValue.label,
          this.phoneNumber || '',
          formValue.message
        );

    smsObservable.subscribe({
      next: response => {
        console.log(this.isScheduled ? 'SMS scheduled successfully' : 'SMS sent successfully', response);
        this.smsForm.reset();
        this.isSubmitting = false;
        this.isScheduled = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        console.error(this.isScheduled ? 'Error scheduling SMS' : 'Error sending SMS', error);
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.smsForm.reset();
    this.isScheduled = false;
    this.router.navigate(['/dashboard']);
  }

  private futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5);
      return selectedDate >= now ? null : { futureDate: true };
    };
  }

  private scheduledDateValidator(group: FormGroup): ValidationErrors | null {
    const scheduledDateTime = group.get('scheduledDateTime')?.value;
    if (this.isScheduled && !scheduledDateTime) {
      return { requiredScheduledDate: true };
    }
    return null;
  }
}