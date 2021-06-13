import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

//Store holding all of the data in the entire site.
export default combineReducers({
    user: userReducer,
    cart: cartReducer
})