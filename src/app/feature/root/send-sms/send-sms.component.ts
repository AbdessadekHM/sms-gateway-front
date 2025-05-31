import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Receiver } from '../../../core/models/Reciever';
import { Group } from '../../../core/models/Group';
import { SmsService } from '../../../core/services/sms.service';
import { ReceiverService } from '../../../core/services/receiver.service';
import { GeminiService } from '../../../core/services/gemini.service';

@Component({
  selector: 'app-send-sms',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './send-sms.component.html',
  styleUrl: './send-sms.component.css'
})
export class SendSmsComponent implements OnInit{

  Ids!:Observable<Receiver | Group>[];

  selectedType!: string ;
  selectedId!: number;
  

  smsForm: FormGroup;
  
  phoneNumber!: string;


  isSubmitting = false;
  aiPrompt = '';
  isGenerating = false;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private smsService: SmsService,
    private receiverService: ReceiverService,
    private router: Router,
    private geminiService: GeminiService
  ) {
    this.smsForm = this.fb.group({
      label: ['', Validators.required],
      message: ['']
    });
  }



  ngOnInit(): void {
    

    this.selectedId = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.selectedType = this.route.snapshot.paramMap.get('type') as unknown as string;
    this.route.paramMap.subscribe((param)=>{

      this.selectedType = param.get('type') as unknown as string;
      this.selectedId = param.get('id') as unknown as number;
      this.phoneNumber = param.get('id') as unknown as string;
      console.log(this.selectedType, this.selectedId, this.phoneNumber);
      
      
      
    })

    console.log(this.selectedId, this.selectedType)

    
  }
  





  onSubmit() {
    if (this.smsForm.valid) {
      const formValue = this.smsForm.value;
      this.smsService.sendSms(formValue.label, this.phoneNumber, formValue.message).subscribe(
        (response) => {
          console.log('SMS sent successfully', response);
          this.smsForm.reset();
        },
        (error) => {
          console.error('Error sending SMS', error);
        }
      );
      
    }
  }

  cancel() {
    this.smsForm.reset();
    
    this.router.navigate(['/dashboard']);
    console.log('Form cancelled');
  }
  
  generateWithAI(): void {
    if (this.aiPrompt && !this.isGenerating) {
      this.isGenerating = true;
      console.log('Generating SMS with AI for prompt:', this.aiPrompt);
      const response = this.geminiService.generate(this.aiPrompt).then((generatedMessage) => {
        
        if (generatedMessage) {
          this.smsForm.get('message')?.setValue(generatedMessage);
          this.isGenerating = false;
          this.aiPrompt = ''; // Clear the prompt after generation
        } else {
          console.error('AI generation failed or returned empty response');
          this.isGenerating = false;
        }
      }).catch((error) => {
        console.error('Error during AI generation:', error);
        this.isGenerating = false;
      });
      
      // setTimeout(() => {
      //   const generatedMessage = `Generated SMS for: ${this.aiPrompt}`; // Replace with actual API call
      //   this.smsForm.get('message')?.setValue(generatedMessage);
      //   this.isGenerating = false;
      //   this.aiPrompt = ''; // Clear the prompt after generation
      // }, 1000);
    }
  }
  

}
