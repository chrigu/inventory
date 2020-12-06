// https://github.com/aaronksaunders/ionic-vue3-sample-3/blob/master/src/hooks/firebase-auth.ts
import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";
import useFirebaseAuth from "../hooks/firebase-auth";

import FIREBASE_CONFIG from "../firebase.config";
const authState = useFirebaseAuth()

// initialize firebase, this is directly from the firebase documentation
// regarding getting started for the web
if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
  console.log(process, FIREBASE_CONFIG)
}

// const USERS_COLLECTION_PATH = "users/";

function createBeer (doc: firebase.firestore.DocumentData | undefined) {

  return {
    ...doc?.data()
  }
}

export default function() {
  const addItem = async (item: any) => {
    const userId = (authState.user.value as any)?.uid
    // beer.userId = userId

    // const resp  = await firebase
    //   .firestore()
    //   .collection('beers')
    //   .add(beer)
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  }

  return {
    addItem
  };
}