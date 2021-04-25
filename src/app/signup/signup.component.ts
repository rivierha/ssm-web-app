import {
	Component,
	OnInit
} from '@angular/core';
import {
	FormControl,
	FormGroupDirective,
	NgForm,
	Validators,
	FormGroup,
	FormBuilder
} from '@angular/forms';
import {
	ErrorStateMatcher
} from '@angular/material/core';
import {
	AuthService
} from '../auth/auth.service';
import {
	AlertService
} from '../alert';

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

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertService: AlertService) {
		this.profileForm = this.formBuilder.group({
			fullName: ['', [Validators.required]],
			email: ['', [Validators.required]],
			password: ['', [Validators.required]],
			confirmPassword: ['']
		}, {
			validator: this.checkPasswords
		});
	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		let pass = group.controls.password.value;
		let confirmPass = group.controls.confirmPassword.value;
		return pass === confirmPass ? null : {
			notSame: true
		}
	}

	ngOnInit(): void {}

	async onSubmit() {
		try {
			await this.authService.signUpWithEmailPassword(this.profileForm.value.fullName, this.profileForm.value.email, this.profileForm.value.password);
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			})
			console.error(error);
		}
	}

}