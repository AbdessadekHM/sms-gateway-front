import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';


import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Link } from '../../../core/models/NavLinks';




@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  standalone: true
})
export class NavbarComponent implements OnInit {



  isMobileMenuOpen = false;
  protected authService = inject(AuthService);
  

  public renderedLinks!: Link[];


  ngOnInit(): void {
    
  }





  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  async onLogin(): Promise<void> {
    
  }

  async onLogout(): Promise<void> {
    this.authService.logout();
  }

  async onRegister(): Promise<void> {
    try {
      await this.authService.register();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }


}
