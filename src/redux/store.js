import { createStore, applyMiddleware } from "redux";
//Logger allows us to see what's being stored in the redux log, making debugging easier
import logger from 'redux-logger'

//Middleware are functions sittings between action and reducer
import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore( rootReducer, applyMiddleware( ...middlewares ));

export default store;