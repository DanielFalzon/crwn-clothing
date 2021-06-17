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

    //Note: The reference and snapshot are always returned even if they don't exists.
    //Gives us flexibility since firebase doesn't give us an error.

    //Get the documentReference
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //Get the documentSnapshot
    const snapShot = await userRef.get();

    //Using documentSnapshot, we determing whether we should create a new user on our DB or not.
    //This uses the snapshot.exists param to check.
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    //Batch write ensures that the data is either wholly imported or not at all

    const batch = firestore.batch();
    //Foreach doesn't return a new array, map() does
    objectsToAdd.forEach( obj => {
        //Get document at an empty string (random ID)
        const newDocRef = collectionRef.doc();
        
        //All calls are batched together
        batch.set(newDocRef, obj);
    });

    //Commit the stored set requests as a promise
    return await batch.commit();
};

//Map through the returned documents to add data (route and ID) to the returned snapshot.
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( 
        doc => {
            const{ title, items} = doc.data();
            return {
                //Passes a string that encodes characters that a url can't process
                routeName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title,
                items
            }
        }
    );

    //Creates a new array that holds the key as the collection name and the value as the collection object.
    //Accumulator stores the returned values from the reduce.
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
};


firebase.initializeApp( config );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 