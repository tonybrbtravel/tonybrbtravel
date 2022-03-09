import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
// import { applyMiddleware, compose } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import createRootReducer from './reducers';
import rootSaga from './rootSaga';

import history from './history';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['signup'],
};

const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
  routerMiddleware(history),
];

export default configureStore({
  reducer: persistedReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);
