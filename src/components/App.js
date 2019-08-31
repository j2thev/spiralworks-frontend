import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from '../store';
import history from '../utils/history';
import Routes from './Routes';

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object,
  history: PropTypes.func
}

export default App;
