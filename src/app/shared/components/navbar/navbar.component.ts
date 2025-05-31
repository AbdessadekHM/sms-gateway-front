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



  async onLogout(): Promise<void> {
    this.authService.logout();
  }




}
