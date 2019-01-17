import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { send } from './functions/send-mail';

exports.sendMail = functions.database
.ref('/quadri/queries/{pushId}')
.onCreate(send);