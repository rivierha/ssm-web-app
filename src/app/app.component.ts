import {
	Component
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
	AuthService
} from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'SSM';
	constructor(public router: Router, private auth: AuthService) {
		console.log("VERSION-2")
	}

	
	logoutUser() {
		this.auth.signOut();
	}

}