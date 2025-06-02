import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceiverService } from '../../../core/services/receiver.service';
import { Receiver } from '../../../core/models/Reciever';
import { Group } from '../../../core/models/Group';
import { GroupService } from '../../../core/services/group.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-add-group',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup;
  allMembers!: Receiver[];
  filteredMembers!: Receiver[];
  selectedMembers: any[] = [];
  blurTimeout: any;


  isSubmitting = false;
  isFocused = false;
  



  constructor(
    private fb: FormBuilder,
    private receiverService: ReceiverService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      members: [[], Validators.required]
      
    });
    
  }



  ngOnInit(): void {

    this.groupService.fetchGroups().subscribe(groups => {
      console.log('Fetched groups:', groups);
    }
    );
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

      this.isSubmitting = true;
      const formValue = this.groupForm.value;
      
      const member_ids = this.groupForm.get('members')?.value.map((member: any) => member.id);
      const newGroup = {
        ...formValue,
        receiverIds: member_ids,
        userId: sessionStorage.getItem('userId')  
      };
      delete newGroup.members;
      console.log('New Group:', newGroup);
      this.groupService.addGroup(newGroup).subscribe(
        (response) => {
          console.log('Group added successfully:', response);

          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error adding group:', error);
        }
      );
      
      this.groupForm.reset();
      this.selectedMembers = [];
      this.filteredMembers = [...this.allMembers];
    }
  }

  cancel() {
    this.groupForm.reset();
    this.selectedMembers = [];
    this.filteredMembers = [...this.allMembers];
    this.router.navigate(['/dashboard']);
    
  }
}