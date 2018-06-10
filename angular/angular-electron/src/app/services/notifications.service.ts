import { Injectable } from '@angular/core';
import {  AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Observable } from 'rxjs';
import {NotificationObject} from '../Models/NotificationObject';
import { Observable } from 'rxjs/internal/Observable';
//import { AuthService } from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationsCollection: AngularFirestoreCollection<NotificationObject>;
  public notifications: Observable<NotificationObject[]>;
  //uid: string;
  constructor(private afs: AngularFirestore, 
    /* private as: AuthService */) {

   }
   getNotificationsFromHour(uid: string, hours: number): Observable<NotificationObject[]> {
     return this.getNotifications(uid, new Date(new Date().getTime()-(hours*60*60*1000)))
   }
   getCurrentNotifications(uid: string): Observable<NotificationObject[]> {
     return this.getNotifications(uid, new Date(new Date().getTime()-(10*1000)))
   }
   getNotifications(uid: string, time: Date): Observable<NotificationObject[]> {
    //console.log(id);
    this.notificationsCollection = this.afs.collection(uid).doc('userNotifications')
      .collection('notifications', ref =>
      {
        return ref
                .where('timestamp', '>=', time)
                .orderBy('timestamp', 'desc')
        
      });
      //'timestamp', '>=', new Date(new Date().getTime()-10000)
    this.notifications = this.notificationsCollection.valueChanges();
    console.log(this.notifications);
    return this.notifications;
  }
}
