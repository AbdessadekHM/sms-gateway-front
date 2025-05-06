import { Injectable } from '@angular/core';
import { Group } from '../../shared/models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[] = [
    { name: "main", members: null, createdAt: "2025-01-01T10:00:00Z", id: "1", description: "Group A Description" },
    
  ];
  

  constructor() { }

  addGroup(group: Group) {
    this.groups.push(group);
  }

  removeGroup(name: string) {
    const groups = this.groups.filter(group => group.name !== name);
    this.groups = groups;
  }

  addMember(groupName: string, member: any) {
    const group = this.groups.find(group => group.name === groupName);
    if (group) {
      if (group.members) {
        group.members.push(member);
      } else {
        group.members = [member];
      }
    }
  }
  removeMember(groupName: string, memberName: string) {
    const group = this.groups.find(group => group.name === groupName);
    if (group && group.members) {
      const members = group.members.filter(member => member.name !== memberName);
      group.members = members;
    }
  }
}
