import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private keycloak = inject(Keycloak);
  private router = inject(Router);
  private authenticated = false;

  public async login() {
    // log the current url
    console.log('Current URL:', window.location.href);
    await this.keycloak.login({
      redirectUri: window.location.origin+"/dashboard",
    });
  }

  public async logout() {
    console.log('Logging out...');
    this.getProfile().then((profile) => {
      console.log('User profile:', profile);

    })
    await this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  public isAuthenticated(): boolean {
    return !!this.keycloak.authenticated;
  }

  public async getProfile(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  public async register() {
    await this.keycloak.register({
      redirectUri: window.location.href,
    });
  }
}
