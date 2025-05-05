import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceiverService } from '../../../core/services/receiver.service';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./add-receiver.component.css']
})
export class AddReceiverComponent implements OnInit {
  receiverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private receiverService: ReceiverService
  ) {
    this.receiverForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.receiverForm.valid) {
      const formValue = this.receiverForm.value;
      const newReceiver = {
        ...formValue,
        createdat: new Date().toISOString()
        };
        
        this.receiverService.addReceiver(newReceiver);
        console.log(this.receiverService.getReceivers());


      
      this.receiverForm.reset();
    }
  }

  cancel() {
    this.receiverForm.reset();
    
    console.log('Form cancelled');
  }
}