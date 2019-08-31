import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import appReducer from '../reducers';
import initialState from '../reducers/initialState';
// import logger from 'redux-logger';
import { LOGOUT } from '../constants/actionTypes';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    storage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  // logger,
  thunk
];

export default () => {
  const store = createStore(persistedReducer, initialState, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  
  return {
    store,
    persistor
  };
}
