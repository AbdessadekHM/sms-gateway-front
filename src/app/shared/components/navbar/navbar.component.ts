import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  profile: Observable<Keycloak.KeycloakProfile> | undefined;
  protected authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    try {
      if (this.authService.isAuthenticated()) {
        this.profile = this.authService.getUserInfo();
      }
    } catch (error) {
      console.error('Error initializing profile:', error);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  async onLogin(): Promise<void> {
    try {
      await this.authService.login();
      this.profile = this.authService.getUserInfo();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.profile = undefined;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async onRegister(): Promise<void> {
    try {
      await this.authService.register();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}
