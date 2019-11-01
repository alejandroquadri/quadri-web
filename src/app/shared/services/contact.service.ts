import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private api: ApiService,
    private db: AngularFirestore
  ) { }

  sendQuery(query) {
    return this.api.post('query-quadri', query);
  }

  // saveQuery(query) {
  //   return this.api.push('queries', query);
  // }

  saveQuery(query) {
    let salesman;
    Math.random() > 0.5 ? salesman = 'Tarruella Alberto' : salesman = 'Roldan Alejandra';
    const form = {
      salesman,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'Pendiente',
      ... query
    }
    return this.db.collection<any>('queries').add(form);
  }

  captureEmail(email) {
    return this.api.push('email_db', {email: email});
  }
}
