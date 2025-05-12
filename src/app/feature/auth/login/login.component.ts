import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthResponse} from '../../../dto/AuthResponse';
import {User} from '../../../dto/user';
import {AuthService} from '../../../core/services/auth.service';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  public  url="http://127.0.0.1:7001/"
  public token:string="";
  public auth=inject(AuthService);


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let endPoint="auth/login"

    console.log("test")

    this.auth.login(this.username, this.password);


  }

  // Helper methods for form validation
  get email() {
    return this.loginForm.get('email');
  }
  get username():string {
    return this.loginForm.get('username')?.value;
  }
  get password() {
    return this.loginForm.get('password')?.value;
  }
}
