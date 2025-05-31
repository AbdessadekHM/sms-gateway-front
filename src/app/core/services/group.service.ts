import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Group } from '../models/Group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[] = [
    { name: "main", members: null, createdAt: "2025-01-01T10:00:00Z", id: "1", description: "Group A Description" },
    
  ];
  

  constructor(
    private http: HttpClient
  ) { }

  fetchGroups():Observable<any>{
    return this.http.get(environment.apiUrl + '/groups', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }
  addGroup(group: any) {
    return this.http.post(environment.apiUrl + '/groups', group, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
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
