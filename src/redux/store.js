import { createStore, applyMiddleware } from "redux";
//Logger allows us to see what's being stored in the redux log, making debugging easier
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

//Middleware are functions sittings between action and reducer
import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore( rootReducer, applyMiddleware( ...middlewares ));

export const persistor = persistStore(store);

export default {store, persistor};