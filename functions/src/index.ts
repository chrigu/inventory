import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.addHash = functions.firestore
    .document('items/{itemId}').onCreate((change, context) => {
        functions.logger.log("context", context, change);
    });
