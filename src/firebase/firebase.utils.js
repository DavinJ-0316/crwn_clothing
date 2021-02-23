import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDLXSyCBLm8lVvEnNTxR0p5RcjbSHc8E1k",
    authDomain: "crwn-db-d0afa.firebaseapp.com",
    projectId: "crwn-db-d0afa",
    storageBucket: "crwn-db-d0afa.appspot.com",
    messagingSenderId: "240029591073",
    appId: "1:240029591073:web:bf6707d7d096158ad72560",
    measurementId: "G-9YSYY2KZL9"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            // input into database
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user');
        }
    }
    return userRef;
    console.log(snapShot);
  }; 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;