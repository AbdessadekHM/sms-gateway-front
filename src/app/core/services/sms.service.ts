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

}


