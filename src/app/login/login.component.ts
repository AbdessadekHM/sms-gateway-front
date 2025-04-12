import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.loginForm.value);
        this.isLoading = false;
        this.router.navigate(['/home']);
      }, 1500);
    }
  }

  // Helper methods for form validation
  get email() { return this.loginForm.get('email'); }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
