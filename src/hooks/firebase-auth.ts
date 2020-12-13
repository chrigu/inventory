// https://github.com/aaronksaunders/ionic-vue3-sample-3/blob/master/src/hooks/firebase-auth.ts
import { toRefs, reactive } from "vue";
import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";

import FIREBASE_CONFIG from "../firebase.config";

// initialize firebase, this is directly from the firebase documentation
// regarding getting started for the web
if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
  console.log(process, FIREBASE_CONFIG)
}

const auth = firebase.auth()

auth.useEmulator("http://localhost:9099")

// const USERS_COLLECTION_PATH = "users/";

interface TState {
  error: Error | null;
  loading: boolean;
  user: firebase.User | firebase.auth.UserCredential | null;
  initialized: boolean;
}

const state = reactive<TState>({
  user: null,
  loading: true,
  error: null,
  initialized: false,
});

export default function() {

        /**
   *
   * @param username
   * @param password
   */

  const login = (username: string, password: string) => {
    state.loading = true;

    return auth
      .signInWithEmailAndPassword(username, password)
      //load user data from db
      .then(
        async (user) => {
          state.error = null;
          state.loading = false;
          state.user = user;
          console.log(state.user, state.user)
          return user;
        },
        (error) => {
          state.error = error;
          state.loading = false;
          throw error;
        }
      )
      .catch((error) => {
        // Handle Errors here.
        state.error = error;
        state.loading = false;
        throw error;
      });
  };

  /**
   *
   */
  const logout = () => {
    return auth
      .signOut()
      .then(
        () => {
          state.error = null;
          state.loading = false;
          state.user = null;
        },
        (error) => {
          state.error = error;
          state.loading = false;
        }
      )
      .catch((error) => {
        // Handle Errors here.
        state.error = error;
        state.loading = false;
      });
  };

  // RUN AT STARTUP
  const authCheck = () => {
    return new Promise((resolve, reject) => {
      state.loading = true;
      !state.initialized &&
        firebase.auth().onAuthStateChanged(async (_user) => {
          console.log('onAuthStateChanged', _user)
          if (_user) {
            state.user = _user;
            console.log('signup', _user)
          } else {
            state.user = null;
          }
          state.loading = false;
          state.initialized = true;
          resolve(true);
        });
    });
  };

  const authError = (error: firebase.FirebaseError) => {

    const {code, message} = error;
    console.warn(error)
    switch (code) {
      case 'auth/weak-password':
        return 'The password is too weak.'
      case 'auth/email-already-in-use':
        return 'The email is already registered'
      case 'auth/invalid-email':
        return 'The provided email is not valid'
      default:
        return message
    }
  }

  const updateDisplayName = (user: firebase.User, displayName: string) => {
    return user.updateProfile({
      displayName: displayName
    }).then(function() {
      if (state) {
        (state.user as firebase.User).displayName = displayName;
      }
    }, function(error) {
      // An error happened.
    });
  }



  return {
    ...toRefs(state),
    // FUNCTIONS
    login,
    logout,
    authCheck,
    authError,
    updateDisplayName,
  };
}