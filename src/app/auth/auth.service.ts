import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: any;

    constructor(public afAuth: AngularFireAuth, public router: Router, private usersService: UsersService) { 
        this.afAuth.authState.subscribe(user => {
        if (user){
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
        } else {
            localStorage.setItem('user', "");
        }
        })
    } 

    async signInWithEmailPassword(email: string, password: string) {
        try {
            let data:any = {};
            await firebase.auth().signInWithEmailAndPassword(email, password).then(
                async (userCredentials: any) => {
                    await this.usersService.getAllUsers(userCredentials.user.email).subscribe(
                        (res: any) => {
                            console.log("users", res);
                            localStorage.setItem('user', JSON.stringify(res[0]));
                            localStorage.setItem('authenticated', "true");
                            if (this.user.team == null) 
                                this.router.navigate(['/teams']);
                            else 
                                this.router.navigate(['/instances']);

                        }
                    );
            })
            return data;
        } catch (e) {
            localStorage.setItem('authenticated', "false");
            alert("Error!" + e.message);
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
                        localStorage.setItem('user', JSON.stringify(res.user));
                        localStorage.setItem('authenticated', "true");
                        this.router.navigate(['/teams']);
                    }
                );
            })
        } catch (e) {
            localStorage.setItem('authenticated', "false");
            alert("Error!" + e.message);
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
                alert("Error!" + error.message);
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



    
}
