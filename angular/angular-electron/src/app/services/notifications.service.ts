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
   getNotifications(uid: string): Observable<NotificationObject[]> {
    //console.log(id);
    this.notificationsCollection = this.afs.collection(uid).doc('userNotifications')
      .collection('notifications', ref =>
      {
        return ref
                .where('timestamp', '>=', new Date(new Date().getTime()-(60*60*1000)))
                .orderBy('timestamp', 'desc')
        
      });
      //'timestamp', '>=', new Date(new Date().getTime()-10000)
    this.notifications = this.notificationsCollection.valueChanges();
    console.log(this.notifications);
    return this.notifications;
  }
}
