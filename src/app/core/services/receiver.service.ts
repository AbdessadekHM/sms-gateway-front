import { Injectable, OnInit } from '@angular/core';
import { Receiver } from '../models/Reciever';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  private users: Receiver[] = []

  constructor(private http: HttpClient) { }
  
  fetchReceivers(): Observable<any> {
    
    return this.http.get<any>(environment.apiUrl+ '/api/receivers', {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }


  addReceiver(reciever: Receiver){
    this.users.push(reciever)
  }

  removeReceiver(name: string){
    const users = this.users.filter(user=> user.name !== name);
    this.users = users;
  }

  getReceivers(){
    
    
    return this.users;
  }
}
