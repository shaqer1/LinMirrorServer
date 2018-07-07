import { Injectable } from '@angular/core';
import { auth } from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFirestore} from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { of } from 'rxjs';

import { EmailPasswordCredentials } from '../Models/EmailPasswordCredentials';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: /* Observable<User | null> */Promise<void>;
  userDB: User;
  authState: any = null;
  //private pendingUser = new BehaviorSubject<string>('dsfsd');
  //name = this.pendingUser.asObservable();

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private notify: NotifyService) {
                this.afAuth.authState.subscribe((auth) => {
                  this.authState = auth
                });

            this.user = this.afAuth.authState
            .forEach(user => {
              if (user) {
                return this.afs.doc<User>(`${user.uid}/userInfo`).valueChanges()
              } else {
                return of(null)
              }
            })
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  get currentUserObservable(): any {
    return this.afAuth.auth
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

  private oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
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
  emailSignUp(credentials: EmailPasswordCredentials) {
    this.email = credentials.email;
    this.password = credentials.password;
    this.username = credentials.displayName;
    this.photoURL = credentials.photoURL;
    console.log(this.username, this.photoURL);
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
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
        //const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${user.uid}/userInfo`);
       /*  userRef.valueChanges().subscribe(
            (u: User) => {
              console.log('in service settting observable');
              //this.pendingUser.next(u.displayName);
            }
          ); */
          //return;
          this.updateUserData(user.user); // if using firestore
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
        //this.router.navigate(['/search']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User):Promise<any> {
    console.log(user);
    console.log(user.uid); 
    //console.log(user.user.uid);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${user.uid}/userInfo`);
    
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || this.username || 'nameless user',
      photoURL: user.photoURL || this.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }
}