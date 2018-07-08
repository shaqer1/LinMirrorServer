import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      /* if (this.auth.authenticated) { 
        console.log('authenticated in guard')
        return true; 
      } */
      
      return this.auth.currentUserObservable.pipe(
       map(user => !!user),
       tap(loggedIn => {
         console.log('in authguard')
          if (!loggedIn) {
            console.log("access denied");
            this.router.navigate(['/login']);
          }
        })
       /* .do(loggedIn => {

       }) */
      )/* 
      .take(1)
      .map(user => !!user)
      .do(authenticated => {
        if (!authenticated) {
            this.router.navigate(['/login']);
        }
      }) */
    //return false;
  }
}
