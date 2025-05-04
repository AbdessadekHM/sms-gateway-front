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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule,InputComponent, PrimaryBtnComponent]
})
export class DashboardComponent {
  activeTab = 'users';

  mockUsers = [
    { fullName: 'FullName', phone: 'Phone', createdAt: 'Created at', },
    { fullName: 'FullName', phone: 'Phone', createdAt: 'Created at', },
    
    { fullName: 'FullName', phone: 'Phone', createdAt: 'Created at', },
  ];

  sendSMS(user: any) {
    console.log('Sending SMS to', user);
  }

  sendWhatsApp(user: any) {
    console.log('Sending WhatsApp to', user);
  }
}