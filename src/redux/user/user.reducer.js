//Reducer handling specific type of action passed in the action property.
//Payload object holds the data that would be used to update the data in the Store.

import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

//Every action always get all of the actions that are triggered across the app.
const userReducer = ( currentState = INITIAL_STATE, action ) => {
    //State will initially be null so we need to set an initial state.
    switch( action.type ) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...currentState,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...currentState,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...currentState,
                error: action.payload
            }
        //If another action is called then just return the state
        default:
            return currentState;
    }
}

export default userReducer;