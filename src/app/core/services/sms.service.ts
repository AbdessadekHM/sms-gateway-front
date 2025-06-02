import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  

  constructor(
    private http: HttpClient
  ) { }


  sendSms(label:string, phoneNumber: string, message: string) {
    const data = {
      label,
      phoneNumber,
      message
    };
    return this.http.post(environment.apiUrl + "/sendmsg/send", data, {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }

  scheduleSms(label: String, phoneNumber: string, message: String, scheduledTime: String) {
    const data = {
      label,
      phoneNumber,
      message,
      scheduledTime,
      userId: sessionStorage.getItem("userId")
    }
    return this.http.post(environment.apiUrl + "/schedule", data, {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});

  }
  getScheduledSms(){
    return this.http.get(environment.apiUrl + "/schedule", {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }

  cancelScheduledSms(id: number) {
    const data = { 
      id
    }
    return this.http.delete(environment.apiUrl + "/schedule/" + id ,  {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }

  getHistory(){
    return this.http.get(environment.apiUrl + "/sendmsg/history", {headers: {Authorization: "Bearer " + sessionStorage.getItem("accessToken") }});
  }
}


