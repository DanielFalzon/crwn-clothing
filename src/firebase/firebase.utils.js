import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBE5U_Q1xPZrOCdaUSBk-jEE44T7mG2Cks",
    authDomain: "crwn-db-a7d64.firebaseapp.com",
    projectId: "crwn-db-a7d64",
    storageBucket: "crwn-db-a7d64.appspot.com",
    messagingSenderId: "303423013175",
    appId: "1:303423013175:web:a1401aaf18d77924cf9ab2",
    measurementId: "G-BZZYJQZXR2"
};

export const createUserProfileDocument = async ( userAuth, additionalData ) => {
    if ( !userAuth ) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if( !snapShot.exists ){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch ( error ){
            console.log( 'error creating user', error.message );
        }
    }

    return userRef;
}

firebase.initializeApp( config );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 