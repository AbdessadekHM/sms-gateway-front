import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { AuthenticatedLinks, Link, UnauthenticatedLinks } from '../../models/NavLinks';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  standalone: true
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  protected authService = inject(AuthService);
  profile: KeycloakProfile | null = null;

  public renderedLinks!: Link[];


  async ngOnInit(): Promise<void> {
    try {


    } catch (error) {
      console.error('Error initializing profile:', error);
    }
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  async onLogin(): Promise<void> {
    try {

    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.profile = null;
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
