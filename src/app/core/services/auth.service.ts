import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';
import {User} from '../../dto/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../dto/AuthResponse';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  public  url="http://127.0.0.1:7001/"
  public token:string | undefined="";
  public valid=false
  public router=inject(Router)
  public http=inject(HttpClient)
  public login(username:string, password:string) {
  let endPoint="auth/login"

    let user:User={username:username , password:password }
    let req=this.http.post<AuthResponse>(this.url+endPoint,{username:username , password:password})
      .subscribe({next:e=> {
          this.token = e.token;
          if (this.token != "" && this.token != null) {
            sessionStorage.setItem("accessToken", <string>e.token)
            console.log(e.token);
            this.router.navigateByUrl('/')

          }},


          error: e=>{   this.router.navigateByUrl('/register')}







      });
  return this.valid;


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
