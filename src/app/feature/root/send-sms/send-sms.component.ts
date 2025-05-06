import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Group } from '../../../shared/models/Group';
import { Receiver } from '../../../shared/models/Reciever';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-sms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-sms.component.html',
  styleUrl: './send-sms.component.css'
})
export class SendSmsComponent implements OnInit{

  Ids!:Observable<Receiver | Group>[];

  selectedType!: string ;
  selectedId!: number;
  

   smsForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
      
    })

    console.log(this.selectedId, this.selectedType)

    
  }
  





  onSubmit() {
    if (this.smsForm.valid) {
      const formValue = this.smsForm.value;
      console.log('SMS Data:', formValue);
      
      this.smsForm.reset();
    }
  }

  cancel() {
    this.smsForm.reset();
    
    console.log('Form cancelled');
  }

}
