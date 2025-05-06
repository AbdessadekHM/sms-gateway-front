import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Group } from '../../../shared/models/Group';
import { Receiver } from '../../../shared/models/Reciever';

@Component({
  selector: 'app-send-sms',
  imports: [],
  templateUrl: './send-sms.component.html',
  styleUrl: './send-sms.component.css'
})
export class SendSmsComponent implements OnInit{

  Ids!:Observable<Receiver | Group>[];

  selectedType!: string ;
  selectedId!: number;
  



  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    // this.Ids = this.route.params.pipe(
    //   switchMap((params:Params, index:number) => {
    //     this.selectedId = Number(params.get('id'));

    //     return this.Ids

    //   })
    // )

    this.selectedId = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.selectedType = this.route.snapshot.paramMap.get('type') as unknown as string;
    this.route.paramMap.subscribe((param)=>{

      this.selectedType = param.get('type') as unknown as string;
      this.selectedId = param.get('id') as unknown as number;
      
    })

    console.log(this.selectedId, this.selectedType)

    
  }

}
