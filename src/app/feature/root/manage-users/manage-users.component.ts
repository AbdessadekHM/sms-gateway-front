import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { PrimaryBtnComponent } from "../../../shared/components/button/primary-btn/primary-btn.component";
import { CommonModule } from '@angular/common';
import { ReceiverService } from '../../../core/services/receiver.service';

import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { RouterLink } from '@angular/router';
import { Receiver } from '../../../core/models/Reciever';
import { GroupService } from '../../../core/services/group.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  
  standalone: true,
  imports: [CommonModule, RouterLink, InputComponent]
})
export class ManageUsersComponent implements OnInit {
  Math = Math;
  
  activeTab: 'users' | 'groups' = 'users';
  allUsers !:any[];
  allGroups! :any[]; 
    
  renderedUsers: any[] = [];
  renderedGroups: any[] = [];
  index = 1;
  pageSize = 10;
  indexes: number[] = [];


  constructor(
    private recieverService: ReceiverService,
    private groupService: GroupService
  ){}
  



  ngOnInit(): void {
    this.groupService.fetchGroups().subscribe((data) => {
      this.allGroups = data.content;
      // this.groupService.setGroups(this.mockGroups);
      this.renderedGroups = this.allGroups.slice(0, 8);
      console.log('Fetched groups:', this.allGroups);
      console.log('Rendered groups:', this.renderedGroups);
      
    }, (error) => {
      console.error('Error fetching groups:', error);
    });

    this.recieverService.fetchReceivers().subscribe((data) => {
      this.allUsers = data.content;
      this.recieverService.setUsers(this.allUsers);
      this.indexes = [...Array(Math.floor(this.allUsers.length/8 + 1)).keys()].map(index=>index+1)
      
      this.renderedUsers = this.allUsers.slice(0, 9 )
      
    }, (error) => {
      console.error('Error fetching receivers:', error);
    });
    
    this.updateRenderedItems();
    this.calculateIndexes();


  }


  filterItems(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.index = 1;
    if (this.activeTab === 'users') {
      this.renderedUsers = this.allUsers.filter(user =>
        user.name.toLowerCase().includes(query) || user.phoneNumber.includes(query)
      );
    } else {
      this.renderedGroups = this.allGroups.filter(group =>
        group.name.toLowerCase().includes(query) ||
        (group.description && group.description.toLowerCase().includes(query))
      );
    }
    this.calculateIndexes();
  }

  deleteGroup(groupId: number): void {
    if (confirm('Are you sure you want to delete this group?')) {
      this.allGroups = this.allGroups.filter(group => group.id !== groupId);
      this.updateRenderedItems();
      this.calculateIndexes();
    }
  }

  onIndexChange(page: number): void {
    this.index = page;
    this.updateRenderedItems();
  }

  resetPagination(): void {
    this.index = 1;
    this.updateRenderedItems();
    this.calculateIndexes();
  }

  private updateRenderedItems(): void {
    const start = (this.index - 1) * this.pageSize;
    const end = start + this.pageSize;
    if (this.activeTab === 'users') {
      this.renderedUsers = this.allUsers.slice(start, end);
    } else {
      this.renderedGroups = this.allGroups.slice(start, end);
    }
  }

  private calculateIndexes(): void {
    const totalItems = this.activeTab === 'users' ? this.allUsers.length : this.allGroups.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    this.indexes = Array.from({ length: totalPages }, (_, i) => i + 1);
  }




  mockUsers!: Receiver[];
  mockGroups!: any;
  



  isModalOpen = false;
  


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
