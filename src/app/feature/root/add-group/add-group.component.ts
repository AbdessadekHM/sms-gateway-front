import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceiverService } from '../../../core/services/receiver.service';
import { Receiver } from '../../../core/models/Reciever';


@Component({
  selector: 'app-add-group',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup;
  allMembers!: Receiver[];
  filteredMembers!: Receiver[];
  selectedMembers: any[] = [];
  blurTimeout: any;

  isFocused = false;

  constructor(
    private fb: FormBuilder,
    private receiverService: ReceiverService
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      description: [''],
      members: [[], Validators.required]
      
    });
    
  }

  ngOnInit(): void {
    console.log('AddGroupComponent initialized');
    this.allMembers = this.receiverService.getReceivers();
    this.filteredMembers = [...this.allMembers]
    

  }

  onFocus(){
    this.isFocused = true;
  }
  onBlur(event: Event){

    this.blurTimeout = setTimeout(() => {
    this.isFocused = false;
    }, 200);
    this.isFocused = false;
  }
  preventBlur(event: MouseEvent): void {
    
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.blurTimeout);
  }


  isMemberSelected(member: any): boolean {
    return this.selectedMembers.some(m => m.id === member.id);
  }


  filterMembers(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredMembers = this.allMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm)
    );
    
  }

  toggleMember(event: Event, member: any) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedMembers = [...this.selectedMembers, member];
    } else {
      this.selectedMembers = this.selectedMembers.filter(m => m.id !== member.id);
    }
    this.groupForm.get('members')?.setValue(this.selectedMembers);
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const formValue = this.groupForm.value;
      const newGroup = {
        ...formValue,
        createdAt: new Date().toISOString() 
      };
      console.log('New Group:', newGroup);
      
      this.groupForm.reset();
      this.selectedMembers = [];
      this.filteredMembers = [...this.allMembers];
    }
  }

  cancel() {
    this.groupForm.reset();
    this.selectedMembers = [];
    this.filteredMembers = [...this.allMembers];
    
    console.log('Form cancelled');
  }
}