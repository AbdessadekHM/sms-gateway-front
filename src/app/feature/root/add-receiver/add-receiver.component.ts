import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceiverService } from '../../../core/services/receiver.service';
import { Router, RouterLink } from '@angular/router';
import CountryList from 'country-list-with-dial-code-and-flag';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  
})
export class AddReceiverComponent implements OnInit {

//   receiverForm: FormGroup;
// isSubmitting: any;

  // constructor(
  //   private fb: FormBuilder,
  //   private receiverService: ReceiverService,
    
  // ) {
  //   this.receiverForm = this.fb.group({
  //     name: ['', Validators.required],
  //     phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
  //   });
  // }


  receiverForm: FormGroup;
  isSubmitting = false;
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private receiverService: ReceiverService,
    private router: Router,

    ) {
    this.receiverForm = this.fb.group({
      name: ['', Validators.required],
      countryCode: ['+212', Validators.required], // Default to +212 (Morocco)
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,12}$/)]]
    });
  }

  ngOnInit(): void {
    // Load country list with flags and dial codes
    this.countries = CountryList.getAll();
  }

  onCountryCodeChange(event: Event): void {
    const selectedCode = (event.target as HTMLSelectElement).value;
    this.receiverForm.get('countryCode')?.setValue(selectedCode);
  }

  // onSubmit(): void {
  //   if (this.receiverForm.valid && !this.isSubmitting) {
  //     this.isSubmitting = true;
  //     // Simulate API call
  //     setTimeout(() => {
  //       console.log('Receiver Data:', {
  //         name: this.receiverForm.value.name,
  //         phone: `${this.receiverForm.value.countryCode}${this.receiverForm.value.phone}`
  //       });
  //       this.isSubmitting = false;
  //       this.router.navigate(['/dashboard']);
  //     }, 1000);
  //   }
  // }

  // cancel(): void {
  //   this.router.navigate(['/dashboard']);
  // }

  onSubmit() {
    if (this.receiverForm.valid) {
      const formValue = this.receiverForm.value;
      const newReceiver = {
        ...formValue,
        userId: sessionStorage.getItem('userId'), // Assuming userId is stored in sessionStorage
        phoneNumber: `${this.receiverForm.value.countryCode}${this.receiverForm.value.phone}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
        };
        delete newReceiver.phone;
        
        this.receiverService.addReceiver(newReceiver).subscribe(
          (response) => {
            console.log('Receiver added successfully', response);

            this.receiverForm.reset();
          },

          (error) => {
            console.log('Error adding receiver', error);
          })

    }
  }

  cancel() {
    this.receiverForm.reset();
    
    console.log('Form cancelled');
  }
}