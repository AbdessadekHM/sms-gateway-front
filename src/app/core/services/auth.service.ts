import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: Keycloak) {}

  async login() {
    await this.keycloak.login({ redirectUri: window.location.origin });
  }

  async logout() {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }

  async register() {
    await this.keycloak.register({
      redirectUri: window.location.href,
    });
  }

  isAuthenticated(): boolean {
    return !!this.keycloak.authenticated;
  }

getCurrentUser(): Observable<Keycloak.KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }

  getUserInfo(): Observable<Keycloak.KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }
  hasRole(role: string): boolean {
    return <boolean>(
      (this.keycloak.tokenParsed &&
        Array.isArray(this.keycloak.tokenParsed.realm_access?.roles) &&
        this.keycloak.tokenParsed.realm_access.roles.includes(role))
    );
  }

  getUserId(): number | null {
    if (this.keycloak.tokenParsed && this.keycloak.tokenParsed.sub) {
      const id = parseInt(this.keycloak.tokenParsed.sub, 10);
      return isNaN(id) ? null : id;
    }
    return null;
  }
}
