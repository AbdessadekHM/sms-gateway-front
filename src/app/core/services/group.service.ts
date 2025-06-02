import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Group } from '../models/Group';
import { Observable } from 'rxjs';
import { ReceiverService } from './receiver.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: any = [
    
    
  ];
  

  constructor(
    private http: HttpClient,
    private receiverService: ReceiverService
  ) { }

  fetchGroups():Observable<any>{
    return this.http.get(environment.apiUrl + '/groups', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }
  setGroups(groups: Group[]) {
    this.groups = groups;
  }
  addGroup(group: any) {
    return this.http.post(environment.apiUrl + '/groups', group, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }

  removeGroup(name: string) {
    const groups = this.groups.filter((group: any) => group.name !== name);
    this.groups = groups;
  }

  addMember(groupName: string, member: any) {
    const group = this.groups.find((group:any) => group.name === groupName);
    if (group) {
      if (group.members) {
        group.members.push(member);
      } else {
        group.members = [member];
      }
    }
  }
  removeMember(groupName: string, memberName: string) {
    const group = this.groups.find((group:any) => group.name === groupName);
    if (group && group.members) {
      const members = group.members.filter((member:any) => member.name !== memberName);
      group.members = members;
    }
  }
  sendGroupSms(groupId: number, message: string, label:string) {
    console.log('Sending SMS to group:', groupId, 'with message:', message, 'and label:', label);
    console.log('Current groups:', this.groups);
    const group = this.groups.find((g:any) => g.id === groupId);
    console.log("members " + group?.createdAt)

    console.log(group.receiverIds)
    console.log("available keys ", Object.keys(group))
    
    const data = []
    if(!group || !group.receiverIds) {

      console.log(group)
      console.error('Group not found or has no members:', groupId);
      return null;
    }
  
    const receivers = group.receiverIds.map((id:any) => this.receiverService.getReceiverById(id));
    if (!receivers || receivers.length === 0) {
      console.error('No members found in the group:', groupId);
      return null;
    }

    for (const member of receivers) {
      data.push({
        phoneNumber: member.phoneNumber,
        message,
        label
      });
    }

    console.log('Data to be sent:', data);
    
    console.log('Sending SMS to group:', groupId, 'with message:', message);
    return this.http.post(environment.apiUrl + '/sendmsg/send-group', data, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
    
  }

  scheduleSms(id: number, message: string, label: string, scheduledTime: string) {
    const group = this.groups.find((g:any) => g.id === id);
    if (!group || !group.receiverIds) {
      console.error('Group not found or has no members:', id);
      return null;
    }
  
    const receivers = group.receiverIds.map((id:any) => this.receiverService.getReceiverById(id));
    if (!receivers || receivers.length === 0) {
      console.error('No members found in the group:', id);
      return null;
    }

    const data = [];
    for (const member of receivers) {
      data.push({
        phoneNumber: member.phoneNumber,
        message,
        label,
        scheduledTime
      });
    }

    return this.http.post(environment.apiUrl + '/schedule/schedule-group', data, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});

  }
}
