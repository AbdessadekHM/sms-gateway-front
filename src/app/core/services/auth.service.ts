import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/AuthResponse';
import { AuthenticatedLinks, Link, UnauthenticatedLinks } from '../models/NavLinks';


@Injectable({
  providedIn: 'root',

})
export class AuthService {
  public  url="http://127.0.0.1:7001/"
  public token:string | undefined="";

  public valid=false

  public router=inject(Router)

  public http=inject(HttpClient)

  private isAuth = false; ;

  private navBarLinks: Link[] = UnauthenticatedLinks;





  public login(username:string, password:string) {



  let endPoint="auth/login"


    let req=this.http.post<AuthResponse>(this.url + endPoint,{ username, password})
      .subscribe({next:e=> {
          this.token = e.token;
          if (this.token != "" && this.token != null) {
            // sessionStorage.setItem("accessToken", <string>e.token)
            localStorage.setItem("accessToken", <string>e.token)
            console.log(e.token);
            this.isAuth = true;
            this.navBarLinks = AuthenticatedLinks;
            this.router.navigateByUrl('/dashboard')

          }},


          error: e=>{   this.router.navigateByUrl('/register')}







      });
    return this.valid;


  }

  public  logout() {
    this.isAuth = false;
    localStorage.removeItem('accessToken');
    this.navBarLinks = UnauthenticatedLinks;
    this.router.navigateByUrl('/login');


  }

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public  getProfile() {
  }

  public  register() {

  }

  get NavBarLinks(): Link[] {
    return this.navBarLinks;
  }
}
