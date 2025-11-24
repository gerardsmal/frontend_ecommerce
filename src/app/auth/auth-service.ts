import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl?: string;

  grant = signal({
    isAdmin: false,
    isLogged: false,
    userId: null as string | null,
    userName: null as string | null,
  })

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('restore---');
      const isLogged = localStorage.getItem("isLogged") === '1';
      const isAdmin = localStorage.getItem("isAdmin") === '1';
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");

      this.grant.set({
        isAdmin,
        isLogged,
        userId,
        userName
      });
    }
  }


  setAutentificated(userId: any, userName: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isLogged", "1");
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      this.grant.set({
        isAdmin: false,
        isLogged: true,
        userId,
        userName
      });
    }
  }


  setAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "1");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: true
      }));
    }
  }

  setUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "0");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: false
      }));
    }
  }

  resetAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      this.grant.set({
        isAdmin: false,
        isLogged: false,
        userId: null,
        userName: null
      })
    }
  }


  isAutentificated(): boolean {
    return this.grant().isLogged;
  }

  isRoleAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("isAdmin") === '1';
    }
    return false;
  }

}
