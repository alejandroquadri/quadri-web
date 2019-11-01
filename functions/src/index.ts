import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { send } from './functions/send-mail';

exports.sendMail = functions.database
.ref('/queries/{pushId}')
// .onCreate(send);
.onCreate( (snap, context) => {
  const consulta = snap.val();
  return send(consulta);
});

exports.sendMailFirestore = functions.firestore
.document('queries/{queryId}')
.onCreate((snap, context) => {
  const consulta = snap.data();
  console.log(snap, consulta);
  return send(consulta);
});
