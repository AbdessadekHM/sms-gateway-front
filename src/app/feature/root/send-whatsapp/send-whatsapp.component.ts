import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Receiver } from '../../../core/models/Reciever';
import { Group } from '../../../core/models/Group';

@Component({
  selector: 'app-send-whatsapp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-whatsapp.component.html',
  styleUrl: './send-whatsapp.component.css'
})
export class SendWhatsappComponent implements OnInit{
  Ids!:Observable<Receiver | Group>[];

  selectedType!: string ;
  selectedId!: number;
  

   whatsappForm: FormGroup ;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.whatsappForm = this.fb.group({
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



    
  }
  





  onSubmit() {
    if (this.whatsappForm.valid) {
      const formValue = this.whatsappForm.value;
      console.log('Whatsapp Data:', formValue);
      
      this.whatsappForm.reset();
    }
  }

  cancel() {
    this.whatsappForm.reset();
    
    console.log('Form cancelled');
  }


}
