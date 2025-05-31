import { inject, Injectable, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/AuthResponse';
import { AuthenticatedLinks, Link, UnauthenticatedLinks } from '../models/NavLinks';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',

})
export class AuthService  {
  
  public token:string | undefined="";

  public valid=false

  public router=inject(Router)

  public http=inject(HttpClient)

  private isAuth = false; ;

  private navBarLinks: Link[] = UnauthenticatedLinks;

  private user: any;







  public login(username:string, password:string) {






    this.http.post<AuthResponse>(environment.apiUrl + '/auth/login',{ username, password})
      .subscribe({next:e=> {
          this.token = e.token;
          this.user= e.user;
          console.log(e)
          if (this.token != "" && this.token != null) {
            sessionStorage.setItem("accessToken", <string>e.token)
            sessionStorage.setItem("userId", e.user.id)
            
            console.log(e.token);
            this.isAuth = true;
            this.navBarLinks = AuthenticatedLinks;
            this.router.navigateByUrl('/dashboard')

          }},


          error: e=>{   
            // console.log(e.error.message)
            console.log("nothing")
            // this.router.navigateByUrl('/register')
            
            console.log(e.error.message)
          }


      });
    return this.valid;


  }

  public  logout() {
    this.isAuth = false;
    // localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    this.token = undefined;
    this.navBarLinks = UnauthenticatedLinks;
    this.router.navigateByUrl('/login');


  }

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public  getProfile() {
  }

  public  register(user: User) {
    return this.http.post(environment.apiUrl + '/auth/logup', user)

  }

  get NavBarLinks(): Link[] {
    return this.navBarLinks;
  }
  getUser(){
    return this.user;
  }
}
