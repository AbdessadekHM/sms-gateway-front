import { Injectable } from '@angular/core';
import { Reciever } from '../../shared/models/Reciever';

@Injectable({
  providedIn: 'root'
})
export class RecieverService {

  private users: Reciever[] = [
    { name: "Alice Johnson", phone: "+15551234567", createdat: "2025-01-01T10:00:00Z" },
    { name: "Bob Smith", phone: "+15557654321", createdat: "2025-01-02T11:30:00Z" },
    { name: "Charlie Brown", phone: "+15559871234", createdat: "2025-01-03T09:45:00Z" },
    { name: "Diana Prince", phone: "+15553456789", createdat: "2025-01-04T08:20:00Z" },
    { name: "Ethan Hunt", phone: "+15550123456", createdat: "2025-01-05T14:15:00Z" },
    { name: "Fiona Gallagher", phone: "+15552345678", createdat: "2025-01-06T17:30:00Z" },
    { name: "George Martin", phone: "+15557654320", createdat: "2025-01-07T12:00:00Z" },
    { name: "Hannah Montana", phone: "+15554321987", createdat: "2025-01-08T07:45:00Z" },
    { name: "Ian Curtis", phone: "+15557894561", createdat: "2025-01-09T16:50:00Z" },
    { name: "Jane Doe", phone: "+15558765432", createdat: "2025-01-10T13:20:00Z" },
    { name: "Kevin Hart", phone: "+15554987654", createdat: "2025-01-11T10:05:00Z" },
    { name: "Laura Palmer", phone: "+15555678901", createdat: "2025-01-12T09:10:00Z" },
    { name: "Michael Scott", phone: "+15553421876", createdat: "2025-01-13T11:15:00Z" },
    { name: "Nina Simone", phone: "+15556789432", createdat: "2025-01-14T13:45:00Z" },
    { name: "Oscar Wilde", phone: "+15550987654", createdat: "2025-01-15T15:25:00Z" },
    { name: "Pam Beesly", phone: "+15550112233", createdat: "2025-01-16T14:00:00Z" },
    { name: "Quincy Jones", phone: "+15553334444", createdat: "2025-01-17T08:30:00Z" },
    { name: "Rachel Green", phone: "+15555556666", createdat: "2025-01-18T07:55:00Z" },
    { name: "Steve Rogers", phone: "+15557778888", createdat: "2025-01-19T09:40:00Z" },
    { name: "Tina Fey", phone: "+15559990000", createdat: "2025-01-20T18:15:00Z" },
    
  ]

  constructor() { }

  addReciever(reciever: Reciever){
    this.users.push(reciever)
  }

  removeReciever(name: string){
    const users = this.users.filter(user=> user.name !== name);
    this.users = users;
  }

  getRecievers(){
    return this.users;
  }
}
