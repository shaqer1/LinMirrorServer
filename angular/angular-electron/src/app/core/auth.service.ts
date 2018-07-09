import { UserObj } from '../components/users/User';

import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';

import { User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFirestore} from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs';

import { EmailPasswordCredentials } from '../Models/EmailPasswordCredentials';

@Injectable()
export class AuthService {
  user: Observable<UserObj |null>;
  userDB: UserObj;
  authState: any = null;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {
                this.afAuth.authState.subscribe((auth) => {
                  this.authState = auth
                });

            this.afAuth.authState.subscribe(user => {
              if (user) {
                this. user = this.afs.doc<UserObj>(`${user.uid}/userInfo`).valueChanges()
              }
            })
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.authState != null;
  }

  get currentUserObservable(): Observable<User | null> {
    return this.afAuth.authState
  }
  
  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  ////// OAuth Methods /////
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: auth.AuthProvider) :Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log('here in google auth');        
        this.userDB = credential.user;
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.updateUserData(credential.user); // if using firestore
        return credential;
      })
      .catch((error) => this.handleError(error) );
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }
  email: string;
  password: string;
  username: string;
  photoURL: string;

  //// Email/Password Auth ////
  emailSignUp(credentials: EmailPasswordCredentials) :Promise<any> {
    this.email = credentials.email;
    this.password = credentials.password;
    this.username = credentials.displayName;
    this.photoURL = credentials.photoURL;
    console.log(this.username, this.photoURL);
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.userDB = user;
        console.log(user.displayName);
          this.updateUserData(user.user); // if using firestore
        return user;
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(credentials: EmailPasswordCredentials) :Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        console.log('in service settting observable',user.uid);
        this.userDB = user;
        console.log(user.displayName);
          //this.updateUserData(user.user); // if using firestore
        return user;
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  /* resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  } */

  signOut() {
    console.log('here');
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
    console.log('here');
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: UserObj):Promise<any> {
    console.log(user);
    console.log(user.uid); 
    console.log(user.displayName);
    const userRef: AngularFirestoreDocument<UserObj> = this.afs.doc(`${user.uid}/userInfo`);
    
    const data: UserObj = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || this.username || 'nameless user',
      photoURL: user.photoURL || this.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }
}