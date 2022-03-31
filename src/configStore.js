import { createStore, combineReducers } from "redux";

import { applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import storedic from './rdxmod';

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({storedic});


// const store = createStore(rootReducer);
const store = createStore(rootReducer, enhancer);

export default store;
