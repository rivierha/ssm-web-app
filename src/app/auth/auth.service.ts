import {
	Injectable,
	NgZone
} from '@angular/core';
import {
	Router
} from "@angular/router";
import {
	AngularFireAuth
} from "@angular/fire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import {
	UsersService
} from '../services/users.service';
import {
	User
} from '../models/user.model';
import {
	AlertService
} from '../alert';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user: any;
	loggedIn = localStorage.getItem('user') ? true : false;

	constructor(public afAuth: AngularFireAuth, public router: Router, private usersService: UsersService, private alertService: AlertService, private ngZone: NgZone) {}

	async signInWithEmailPassword(email: string, password: string) {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password).then(
				async (userCredentials: any) => {

					if (userCredentials.user.emailVerified !== true) {
						this.alertService.warn('Please validate your email address to proceed. Kindly check your inbox.', {
							autoClose: false,
							keepAfterRouteChange: true
						});
					} else {
						var user = userCredentials.user;
						var data: User = {
							email: user.email,
						}
						await this.usersService.getAllUsers(data.email).subscribe(
							(res: any) => {
								if (res.length == 0)
									this.addUserToDB(data);
								else {
									this.user = res[0];
									this.loggedIn = true;
									localStorage.setItem('user', JSON.stringify(this.user));
									if (this.user.team != null) {
										this.ngZone.run(() => {
											this.router.navigate(['/instances']);
										});
									} else {
										this.ngZone.run(() => {
											this.router.navigate(['/teams']);
										});
									}
								}
							}
						);
					}
				})
		} catch (error) {
			this.alertService.error('Incorrect email or password. Try again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error.message);
		}
	}

	async signUpWithEmailPassword(name: string, email: string, password: string) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (userCredential: any) => {
				var user = userCredential.user;
				var data: User = {
					email: user.email,
					name: name
				}
				this.SendVerificationMail();
			})
		} catch (error) {
			this.alertService.error(error.message, {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error.message);
		}
	}

	async addUserToDB(data: User) {
		await this.usersService.addUser(data).subscribe(
			(res: any) => {
				this.user = res.user;
				this.loggedIn = true;
				localStorage.setItem('user', JSON.stringify(res.user));
				this.alertService.success('Successfully registed!', {
					autoClose: true,
					keepAfterRouteChange: true
				});
				this.router.navigate(['/teams']);
			}
		);
	}

	async signInPopup(source: String) {
		try {
			var provider: any;
			if (source == "google") {
				provider = new firebase.auth.GoogleAuthProvider()
			}
			if (source == "facebook") {
				provider = new firebase.auth.FacebookAuthProvider()
			}
			if (source == "github") {
				provider = new firebase.auth.GithubAuthProvider()
			}
			if (source == "twitter") {
				provider = new firebase.auth.TwitterAuthProvider()
			}

			await firebase.auth().signInWithPopup(provider).then(async (result: any) => {
				var user = result.user;
				var data: User = {
					email: user.email,
					name: user.displayName
				}
				await this.usersService.getAllUsers(data.email).subscribe(
					(res: any) => {
						if (res.length == 0)
							this.addUserToDB(data);
						else {
							this.user = res[0];
							this.loggedIn = true;
							localStorage.setItem('user', JSON.stringify(this.user));
							if (this.user.team != null) {
								this.ngZone.run(() => {
									this.router.navigate(['/instances']);
								});
							} else {
								this.ngZone.run(() => {
									this.router.navigate(['/teams']);
								});
							}
						}
					}
				);
			});
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error.message);
		}
	}

	SendVerificationMail() {
		var user: any = firebase.auth().currentUser;
		user.sendEmailVerification()
			.then(() => {
				this.alertService.warn('Please validate your email address to proceed. Kindly check your inbox.', {
					autoClose: false,
					keepAfterRouteChange: true
				});
				this.ngZone.run(() => {
					this.router.navigate(['/login']);
				})
			});
	}

	async signOut() {
		try {
			await firebase.auth().signOut().then(() => {
				this.user = null;
				this.loggedIn = false;
				localStorage.removeItem('user');
				this.alertService.info('Logged out successfully!', {
					autoClose: true,
					keepAfterRouteChange: true
				});
			});
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error.message);
		}
    }
    

}