import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.addLog = functions.firestore
    .document('items/{itemId}').onCreate((snap, context) => {
        functions.logger.log("auth", context);

        const logObject = {
          timestamp: context.timestamp,
          item: snap.data(),
          type: 'add'
       };
      
       return admin.firestore().collection('logs').doc().create(logObject);

    });
