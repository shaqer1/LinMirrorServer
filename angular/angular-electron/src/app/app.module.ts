import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthService } from './core/auth.service';



import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';


import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import {NotifyService} from './core/notify.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MatButtonModule, MatInputModule, MatListModule, MatCardModule} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment.prod';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuard } from './core/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),  // Add this
    AngularFireAuthModule,
    MatButtonModule, 
    MatCardModule,
    MatListModule,
    BrowserAnimationsModule,
    MatInputModule,
    /* AngularFirestore, */
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule 
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotifyService
  ],
  exports: [MatButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
