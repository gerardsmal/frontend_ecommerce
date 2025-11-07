import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  grant = signal({
    isAdmin: false,
    isLogged: false,
    userId: null as string | null,
    userName: null as string | null,
  })

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
   
    if (isPlatformBrowser(this.platformId)) {
      console.log("restore---")
      const isLogged = localStorage.getItem("isLogged") === '1';
      const isAdmin = localStorage.getItem("isAdmin") === '1';
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");

      if (isLogged) {
        this.grant.set({
          isAdmin: isAdmin,
          isLogged: isLogged,
          userId: userId,
          userName: userName
        })
      }

    }
  }

  setAutentificated(userId: any, userName:any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isLogged", "1");
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      this.grant.set({
        isAdmin: false,
        isLogged: true,
        userId: userId,
        userName: userName
      })

    }
  }

  setAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "1");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: true,
        isLogged: true
      }));
    }
  }

  setUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "0");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: false,
        isLogged: true
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
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("isLogged") === '1';
    }
    return false;
  }
  isRoleAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("isAdmin") === '1';
    }
    return false;
  }

 }
