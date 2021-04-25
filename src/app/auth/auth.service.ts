import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { AlertService } from '../alert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: any;
    loggedIn = localStorage.getItem('user') ? true: false;
    
    constructor(public afAuth: AngularFireAuth, public router: Router, private usersService: UsersService, private alertService: AlertService) { 
    } 

    async signInWithEmailPassword(email: string, password: string) {
        try {
            let data:any = {};
            await firebase.auth().signInWithEmailAndPassword(email, password).then(
                async (userCredentials: any) => {
                    await this.usersService.getAllUsers(userCredentials.user.email).subscribe(
                        (res: any) => {
                            this.user = res[0];
                            this.loggedIn = true;
                            localStorage.setItem('user', JSON.stringify(this.user));
                            if (this.user.team != null) {
                                this.router.navigate(['/instances']);
                            }   
                            else {   
                                this.router.navigate(['/teams']);
                            }
                        }
                    );
            })
            return data;
        } catch (error) {
            this.alertService.error('Incorrect email or password. Try again!', {
                autoClose: true,
                keepAfterRouteChange: true
            });
            console.log(error.message);
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
                await this.usersService.addUser(data).subscribe(
                    (res: any) => {
                        console.log("user", res);
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
            })
        } catch (error) {
            this.alertService.error(error.message, {
                autoClose: true,
                keepAfterRouteChange: true
            });
            console.log(error.message);
        }
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

            await firebase.auth().signInWithPopup(provider).then((result: any) => {
                var credential = result.credential;
                var token = credential.accessToken;
                console.log("TOKEN", token);
                var user = result.user;
                console.log(source + " Sign In", user);
            });
        } catch (error) {
            this.alertService.error('Something went wrong. Try Again!', {
                autoClose: true,
                keepAfterRouteChange: true
            });
            console.log(error.message);
        }
    }    

    // async handleMultipleSingleAccount() {
    //     try {
    //         var repo = new MyUserDataRepo();
    // https://firebase.google.com/docs/auth/web/account-linking#:~:text=You%20can%20allow%20users%20to,they%20used%20to%20sign%20in.
    //         // Get reference to the currently signed-in user
    //         var prevUser = auth.currentUser;

    //         // Get the data which you will want to merge. This should be done now
    //         // while the app is still signed in as this user.
    //         var prevUserData = repo.get(prevUser);

    //         // Delete the user's data now, we will restore it if the merge fails
    //         repo.delete(prevUser);

    //         firebase.auth().signInWithCredential(newCredential).then((result) => {
    //         console.log("Sign In Success", result);
    //         var currentUser = result.user;
    //         var currentUserData = repo.get(currentUser);

    //         // Merge prevUser and currentUser data stored in Firebase.
    //         // Note: How you handle this is specific to your application
    //         var mergedData = repo.merge(prevUserData, currentUserData);

    //         return prevUser.linkWithCredential(result.credential)
    //             .then((linkResult) => {
    //             // Sign in with the newly linked credential
    //             return auth.signInWithCredential(linkResult.credential);
    //             })
    //             .then((signInResult) => {
    //             // Save the merged data to the new user
    //             repo.set(signInResult.user, mergedData);
    //             });
    //         })
    //     } catch (e) {
    //         alert("Error!" + e.message);
    //     }
    // }

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
