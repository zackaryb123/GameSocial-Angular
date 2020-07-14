import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import * as firebase from 'firebase';
admin.initializeApp();

const db = admin.firestore();

exports.userGameClips = functions.https.onCall(async (data: any, constex: CallableContext) => {
    return db.collection('clips').where(firebase.firestore.FieldPath.documentId(), 'in', data.clips).get();
});

