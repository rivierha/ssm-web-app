import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AlertService } from '../alert';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  hide = true;

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private authService: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
  }

  googleLogin() {
    this.authService.signInPopup("google");
  }

  facebookLogin() {
    this.authService.signInPopup("facebook");
  }

  githubLogin() {
    this.authService.signInPopup("github");
  }

  twitterLogin() {
    this.authService.signInPopup("twitter");
  }

  async onSubmit() {
    try {
      await this.authService.signInWithEmailPassword(this.userForm.value.email, this.userForm.value.password);
    } catch (error) {
      this.alertService.error('Something went wrong. Try Again!', {
        autoClose: true,
        keepAfterRouteChange: true
      });
      console.error(error);
    }
  }
}
