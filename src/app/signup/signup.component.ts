import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
  
export class SignupComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  profileForm: FormGroup;
  matcher = new MyErrorStateMatcher(); 
    
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router,) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email:['', [Validators.required]],
      team:['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''] 
    }, {
      validator: this.checkPasswords
    })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.authService.signUpWithEmailPassword(this.profileForm.value.email, this.profileForm.value.password);
    this.router.navigate(['/instances']);
  }

}
