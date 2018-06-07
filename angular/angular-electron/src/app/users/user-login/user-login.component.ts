import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationObject } from '../../Models/NotificationObject';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userForm: FormGroup;
  signupForm: FormGroup;
  newUser: boolean = false;
  constructor(private fb: FormBuilder, 
    public auth: AuthService,
    private ns: NotificationsService) { 
    //this.getComments();
  }

  ngOnInit(): void {
     this.buildForm();
   }

   signup(): void {
     this.auth.emailSignUp(this.signupForm.value)
   }

   login(): void {
     console.log('here');
     this.auth.emailLogin(this.userForm.value).then(
       (user) =>{
        console.log(user.user.uid); 
        this.ns.getNotifications(user.user.uid)
        .subscribe((notification: NotificationObject[]) => {
          console.log(notification[0]);
            new Notification(notification[0].packageName + ': ' + notification[0].title ,{
                body: notification[0].tickerText + ': ' + notification[0].text
            })
        });
       }
     )
   }
   toggleForm(): void {
     this.newUser = !this.newUser;
     this.buildForm();
   }


   /*resetPassword() {
     this.auth.resetPassword(this.userForm.value['email'])
     .then(() => this.passReset = true)
   }*/

   buildForm(): void {
     this.userForm = this.fb.group({
       'email': ['', [
           Validators.required,
           Validators.email
         ]
       ],
       'password': ['', [
         Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25)
       ]
     ],
     });

     this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // reset validation messages
     this.signupForm = this.fb.group({
       'displayName': ['', [
           Validators.required
         ]
       ],
       'photoURL': ['', []
       ],
       'email': ['', [
           Validators.required,
           Validators.email
         ]
       ],
       'password': ['', [
         Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25)
       ]
     ],
     });

     this.signupForm.valueChanges.subscribe(data => this.onSignUpValueChanged(data));
     this.onSignUpValueChanged();
   }

   // Updates validation state on form changes.
   onValueChanged(data?: any) {
     if (!this.userForm && !this.signupForm) { return; }
     const form = this.userForm;
     for (const field in this.formErrors) {
       // clear previous error message (if any)
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key in control.errors) {
           this.formErrors[field] += messages[key] + ' ';
         }
       }
     }
   }
   onSignUpValueChanged(data?: any) {
     if (!this.userForm && !this.signupForm) { return; }
     const form = this.signupForm;
     for (const field in this.formErrors) {
       // clear previous error message (if any)
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key in control.errors) {
           this.formErrors[field] += messages[key] + ' ';
         }
       }
     }
   }

  formErrors = {
     'email': '',
     'password': ''
   };

   validationMessages = {
     'email': {
       'required':      'Email is required.',
       'email':         'Email must be a valid email'
     },
     'password': {
       'required':      'Password is required.',
       'pattern':       'Password must be include at one letter and one number.',
       'minlength':     'Password must be at least 4 characters long.',
       'maxlength':     'Password cannot be more than 40 characters long.',
     }
   };

}
