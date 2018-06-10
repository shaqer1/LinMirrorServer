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

  constructor(private auth: AuthService,
    public ns: NotificationsService
  ) { 
    this.ns.getNotifications(this.auth.currentUser.uid)
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
