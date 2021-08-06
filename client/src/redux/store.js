import { createStore, applyMiddleware } from "redux";
//Logger allows us to see what's being stored in the redux log, making debugging easier
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";



//Middleware are functions sittings between action and reducer
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore( rootReducer, applyMiddleware( ...middlewares ));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };