import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Simulate API call
      // TODO: Replace with actual API call
      this.http
        .post('http://localhost:8000/api/login', this.loginForm.value)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Login failed:', error);
            this.isLoading = false;
          }
        );
    }
  }

  // Helper methods for form validation
  get email() {
    return this.loginForm.get('email');
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
