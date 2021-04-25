import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,private route: Router ) { }

  canActivate() {
    return this.checkLogin();
  }

  checkLogin(): true|UrlTree {
    if (this.auth.loggedIn) { return true; }

    // Redirect to the login page
    return this.route.parseUrl('/login');
  }
}
