import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

//Doing this, we are memoizing the return of the function based on the parameter provided in the collectionUrlParam
export const selectCollection = memoize((collectionUrlParam) => createSelector(
    [selectCollections],
    //find function is being done on every collection in the array, O(n)
    //store lists of elements inside of an object (data normalisation)
    collections => collections[collectionUrlParam]
));