import { takeLatest, call, put } from "redux-saga/effects";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

import ShopActionTypes from "./shop.types";

//Saga intends to run all these functions concurrently without blocking execution.
//Tasks can be cancelled and are executed by the saga middleware.
//Sagas is the dispatch equivalnet
export function* fetchCollectionsAsync(){
    yield console.log('I am fired');

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //Call is the effect that invokes a method. This is to yield the function in case it takes longer than expected.
        //Differs control back to saga middleware.
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch( error ){
        yield put(fetchCollectionsFailure(error.message));
    }
}
    

    //Makes API call to get back the data for the collection reference
//     collectionRef.get().then( snapshot => {
//         //When collection updates or when code is run for the first time get the data
//         //Returns QueryDocumentSnapshot object of the collection. 

//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         dispatch(fetchCollectionsSuccess(collectionsMap));
//     }).catch( error => dispatch(fetchCollectionsFailure(error.message)));
// }

export function* fetchCollectionsStart(){
    //Take every is a saga effect that doesn't pause the JS when called
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}