// import { Component } from '@angular/core';
// import { PrimaryBtnComponent } from "../../../shared/components/button/primary-btn/primary-btn.component";
// import { InputComponent } from "../../../shared/components/input/input.component";

// @Component({
//   selector: 'app-dashboard',
//   imports: [PrimaryBtnComponent, InputComponent],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent {

// }

import { Component } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { PrimaryBtnComponent } from "../../../shared/components/button/primary-btn/primary-btn.component";
import { CommonModule } from '@angular/common';
import { RecieverService } from '../../../core/services/reciever.service';
import { Reciever } from '../../../shared/models/Reciever';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule,InputComponent, PrimaryBtnComponent]
})
export class DashboardComponent {
  activeTab = 'users';

  mockUsers!: Reciever[];
  indexes!: number[];

  index: number = 1;
  renderedUsers!: Reciever[];
  

  constructor(private recieverService: RecieverService){
    this.mockUsers = this.recieverService.getRecievers()
    this.indexes = [...Array(Math.round(this.mockUsers.length/8)).keys()].map(index=>index+1)
    this.renderedUsers = this.mockUsers.slice(0, 8 )
    
  }
  
  onIndexChange(page: number){
    let start = 9*(page-1)

    this.index = page
    this.renderedUsers = this.mockUsers.slice(start ,start+9)

    
    

  }

  sendSMS(user: any) {
    console.log('Sending SMS to', user);
  }

  sendWhatsApp(user: any) {
    console.log('Sending WhatsApp to', user);
  }

}