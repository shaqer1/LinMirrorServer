import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuard } from './core/auth.guard';



const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    // Default route
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
     path: 'notifications',
     component: NotificationsComponent,
     canActivate: [AuthGuard] //for comps which require auth
  },
  {
    // Wildcard route
    // TODO: Add 404 page
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
