import { Injectable, OnInit } from '@angular/core';
import { Receiver } from '../models/Reciever';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  private users: Receiver[] = []

  constructor(
    private http: HttpClient,
    private authService: AuthService
  

  ) { }
  
  fetchReceivers(): Observable<any> {
    
    return this.http.get<any>(environment.apiUrl+ '/receivers/api/receivers', {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }


  addReceiver(reciever: Receiver){

    const user = this.authService.getUser();
    if(user==null) throw new Error("User not authenticated");
    const requestObject = {...reciever, userId: user.id  }
    return this.http.post(environment.apiUrl+ '/receivers/api/receivers', requestObject, {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }

  removeReceiver(name: string){
    const users = this.users.filter(user=> user.name !== name);
    this.users = users;
  }

  getReceivers(){
    
    
    return this.users;
  }
}
