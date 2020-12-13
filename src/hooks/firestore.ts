// https://github.com/aaronksaunders/ionic-vue3-sample-3/blob/master/src/hooks/firebase-auth.ts
import firebase from "firebase"
// Required for side-effects
import "firebase/firestore";
import useFirebaseAuth from "../hooks/firebase-auth";

import FIREBASE_CONFIG from "../firebase.config";
const authState = useFirebaseAuth()
const db = firebase.firestore();

// initialize firebase, this is directly from the firebase documentation
// regarding getting started for the web
if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
  console.log(process, FIREBASE_CONFIG)
}

db.useEmulator("localhost", 8080)

export default function() {
  const addItem = async (item: any) => {
    const userId = (authState.user.value as any)?.uid
    item.userId = userId

    const resp  = await db
      .collection('items')
      .add(item)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error)
    })
  }

  const getItems = async () => {
    const resp  = await db
      .collection('items')
      .get()
      .then(function(querySnapshot) {
          let items: any[] = []
          querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              items = [...items, doc.data()]
          });

          return items
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

      return resp
  }

  const subscribeItems = (updateFn: Function) => {
    db
    .collection('items')
    .onSnapshot(function(querySnapshot) {
        const items: any[] = [];
        querySnapshot.forEach(function(doc) {
          const docData = doc.data()
            items.push({
              ...docData,
              id: doc.id
            });
        });
        updateFn(items)
    });
  }

  return {
    addItem,
    getItems,
    subscribeItems
  };
}
