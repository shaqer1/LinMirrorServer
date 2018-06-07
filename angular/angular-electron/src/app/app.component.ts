import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/takeWhile';
// import 'rxjs/add/operator/do';
import {AuthService} from './core/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(public auth: AuthService){

  }
}