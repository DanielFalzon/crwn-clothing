import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//App can possibly be in a state where data doesn't yet exist since the firbase call is async
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

//Doing this, we are memoizing the return of the function based on the parameter provided in the collectionUrlParam
export const selectCollection = memoize((collectionUrlParam) => createSelector(
    [selectCollections],
    //find function is being done on every collection in the array, O(n)
    //store lists of elements inside of an object (data normalisation)
    collections => (collections ? collections[collectionUrlParam] : null)
));

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);