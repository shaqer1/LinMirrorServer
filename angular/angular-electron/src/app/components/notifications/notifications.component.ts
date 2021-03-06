import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private notifs;

  constructor(public auth: AuthService,
    public ns: NotificationsService
  ) { 
    this.ns.getNotificationsFromHour(this.auth.currentUser.uid, 1)
    .subscribe(
      notifications => {
         console.log(notifications.toString);
        console.log(ns.notifications);
        this.notifs = notifications; 
      });
  }

  ngOnInit() {
  }

}
