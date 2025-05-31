import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { PrimaryBtnComponent } from "../../../shared/components/button/primary-btn/primary-btn.component";
import { CommonModule } from '@angular/common';
import { ReceiverService } from '../../../core/services/receiver.service';

import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { RouterLink } from '@angular/router';
import { Receiver } from '../../../core/models/Reciever';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, InputComponent, PrimaryBtnComponent]
})
export class DashboardComponent implements OnInit {
  activeTab = 'users';

  mockUsers!: Receiver[];
  indexes!: number[];

  index: number = 1;
  renderedUsers!: Receiver[];

  isModalOpen = false;

  constructor(private recieverService: ReceiverService){}
  ngOnInit(): void {

    this.recieverService.fetchReceivers().subscribe((data) => {
      this.mockUsers = data.content;
      this.recieverService.setUsers(this.mockUsers);
      this.indexes = [...Array(Math.floor(this.mockUsers.length/8 + 1)).keys()].map(index=>index+1)
      
      this.renderedUsers = this.mockUsers.slice(0, 9 )
      
    }, (error) => {
      console.error('Error fetching receivers:', error);
    });
    


  }

  onIndexChange(page: number){
    let start = 9*(page-1)

    this.index = page
    this.renderedUsers = this.mockUsers.slice(start ,start+8)




  }
  openModal() {
    console.log("Modal opened");
    this.isModalOpen = true;
  }

  closeModal() {
    console.log('Modal closed');
    this.isModalOpen = false;
  }

  handleSubmit() {
    console.log('Form submitted');
    this.closeModal();
  }

  sendSMS(user: any) {
    console.log('Sending SMS to', user);
  }

  sendWhatsApp(user: any) {
    console.log('Sending WhatsApp to', user);
  }

}
