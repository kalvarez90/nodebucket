/*
============================================
; Title:  app-module.ts
; Author: Professor Krasso
; Date:   8 March 2021
; Modified by: Karina Alvarez
; Description: app module file
;===========================================
*/

//files needed to import external files
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    //if user has access it will be able to log in
    //if user does not have access it will be redirected log-in page
    if (sessionUser)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/session/login']);
      return false;
    }
  }
}
