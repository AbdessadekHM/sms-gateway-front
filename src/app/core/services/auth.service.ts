import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';
import {User} from '../../dto/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public http=inject(HttpClient);
  public  url="http://localhost:8000/"
  public token:string="";

  public login(username:any, password:any) {
  let endPoint="auth/login"

    let user:User={username:username , password:password }
    this.http.post<AuthService>(this.url+endPoint,{user}).subscribe(e => {this.token=e.token;console.log(e.token)});

  }

  public  logout() {


  }

  public isAuthenticated(): boolean {
    return true
  }

  public  getProfile() {
  }

  public  register() {

  }
}
