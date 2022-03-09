// import {combineReducers,createStore,applyMiddleware} from 'redux';
// import CustomerManagementReducer from '../pages/customerManagement/CustomerManagementReducer';
// import createSagaMiddleware from '@redux-saga/core';
// import customerManagementwatcher from '../pages/customerManagement/Saga'

// const reducers = combineReducers({
//     customer : CustomerManagementReducer
// })

// const sagaMiddleware = createSagaMiddleware();

// const middleware = [sagaMiddleware]

// const store = createStore(reducers,{},applyMiddleware(...middleware))

// sagaMiddleware.run( customerManagementwatcher)
// export default store;

import { createStore ,compose,applyMiddleware} from "redux";
 import rootReducer  from "./reducers/index.js"
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import rootSaga from './sagas/index'
export const history = createBrowserHistory();
const sagaMiddileware = createSagaMiddleware();
const store = compose(
    applyMiddleware(sagaMiddileware))(createStore)(rootReducer);
sagaMiddileware.run(rootSaga);
export default store;