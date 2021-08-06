import { createSelector } from 'reselect';

//2 types of selecter (InputSelector and OutputSelector)

//input selector returning a small piece of state.
const selectCart = state => state.cart;

//returns all the memoized cartItems from the state.
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => 
                accumalatedQuantity + cartItem.quantity,
                0
            )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) => 
            accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
)