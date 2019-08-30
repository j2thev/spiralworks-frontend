import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import initialState from '../reducers/initialState';
import history from '../utils/history';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';

const middlewares = [
  logger,
  routerMiddleware(history),
  thunk
];

const store = createStore(
  combineReducers({
    ...reducers
  }),
  initialState,
  applyMiddleware(...middlewares)
);

export default store;
