import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

//Thunks: Action creator returning a function with the dispatch (similar to map state to props method)
//Thunks allow us to catch the actions that aren't objects but functions ( functions that return a function ie {})
//It will then give the dispatch functionality as a param. Dispatch is then used to dispatch the objects used by the
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');

//         //Switch state of reducer to isFetching: true before getting the data
//         dispatch(fetchCollectionsStart());

//         //Makes API call to get back the data for the collection reference
//         collectionRef.get().then( snapshot => {
//             //When collection updates or when code is run for the first time get the data
//             //Returns QueryDocumentSnapshot object of the collection. 

//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//             dispatch(fetchCollectionsSuccess(collectionsMap));
//         }).catch( error => dispatch(fetchCollectionsFailure(error.message)));
//     }
// }


