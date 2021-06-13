export const addItemToCart = (cartItems, cartItemToAdd) => {
    //Returns the first item in CartItems that matches the ID of the new cartItem
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )
    console.log("cartItemtoadd", cartItemToAdd);

    if(existingCartItem) {
        //Apply a function for each of the cartItems
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? 
            { ... cartItem, quantity: cartItem.quantity + 1 } : cartItem    
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}