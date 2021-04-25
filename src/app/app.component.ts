import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(public router: Router, private auth: AuthService) { }
  
  redirectToLoginPage() {
  }

  logoutUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('team');
    localStorage.setItem('authenticated', "false");
    this.auth.loggedIn = false;
    this.auth.user = null;
  }

}
