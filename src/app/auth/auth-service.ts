import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl?: string;

  grant = signal({
    isAdmin: false,
    isLogged: false,
    userId: null as string | null,
    carelloSize: null as string | null,
    userName: null as string | null,
    orderSize: null as number | null,
    isValidate: null as string | null
  })

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('restore---');
      const isLogged = localStorage.getItem("isLogged") === '1';
      const isAdmin = localStorage.getItem("isAdmin") === '1';
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const carelloSize = localStorage.getItem("carelloSize");
      const orderSizeStr = localStorage.getItem("orderSize");
      const orderSize = Number(localStorage.getItem("orderSize") ?? 0);
      const isValidate = localStorage.getItem("isValidate") ;


      this.grant.set({
        isAdmin,
        isLogged,
        userId,
        carelloSize,
        userName,
        orderSize,
        isValidate   
      });
      console.log('[AuthService] constructor isLogged', this.grant().isLogged);
    }
  }


  setAutentificated(userId: any, userName: any, carelloSize: any, orderSizeStr: any, isValidate:any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isLogged", "1");
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("carelloSize", carelloSize);
      localStorage.setItem("orderSize", orderSizeStr);
      localStorage.setItem("isValidate", isValidate);

      const orderSize = Number(localStorage.getItem("orderSize") ?? 0);
     
      this.grant.set({
        isAdmin: false,
        isLogged: true,
        userId,
        carelloSize,
        userName,
        orderSize,
        isValidate
      });
    }
    return EMPTY;
  }


  setAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "1");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: true
      }));
    }
    return EMPTY;
  }

  setCarelloSize(carrello: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("carelloSize", carrello);
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        carelloSize: carrello
      }));
    }
    return EMPTY;
  }

  setOrderSize(orderSizeStr: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("orderSize", orderSizeStr);
      const orderSize = Number(localStorage.getItem("orderSize") ?? 0);
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        orderSize: orderSize
      }));
    }
    return EMPTY;
  }

  setUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "0");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: false
      }));
    }
    return EMPTY;
  }


  resetAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("carelloSize");
      localStorage.removeItem("orderSize");
      localStorage.removeItem("isValidate");
      this.grant.set({
        isAdmin: false,
        isLogged: false,
        userId: null,
        carelloSize: null,
        userName: null,
        orderSize: null,
        isValidate: null
      })
    }
    return EMPTY;
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
